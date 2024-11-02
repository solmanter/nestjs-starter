import { usersTable } from '@libs/schema';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { like } from 'drizzle-orm';
import { DrizzleService } from 'nestjs-drizzle/postgres';
import { authRouter } from './auth.router';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private drizzle: DrizzleService,
    private config: ConfigService
  ) { }

  async register({ body }: TRequest<typeof authRouter.register>) {
    const [resultUser] = await this.drizzle.insert(usersTable, {
      username: body.username,
      password: await hash(body.password)
    }).returning();

    delete resultUser.password;

    return {
      ...resultUser,
      tokens: this.getTokens({ userId: resultUser.id })
    };
  }

  async validateAccessToken(username: string, password: string) {
    this.drizzle.db.select({
      username: usersTable.username
    })
    const [user] = await this.drizzle.get(usersTable, {
      id: usersTable.id,
      username: usersTable.username,
      password: usersTable.password,
    })
      .where(like(usersTable.username, `%${username}%`));

    if (!user) throw new NotFoundException('User not found!');

    if (await verify(user.password, password)) {
      const payload = { userId: user.id };
      return this.getTokens(payload);
    }
    throw new UnauthorizedException('User credentials are not valid!');
  }

  async validateRefreshToken(refreshToken: string, payload: UserPayload) {
    const isValidRefreshToken = this.jwt.verify(refreshToken, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });

    const { userId } = payload;
    if (isValidRefreshToken) return this.getTokens({ userId });
    else {
      throw new Error('Invalid refresh token');
    }
  }

  private getTokens(payload: UserPayload) {
    return {
      access_token: this.getJwtAccessToken(payload),
      refresh_token: this.getJwtRefreshToken(payload),
    };
  }

  private getJwtAccessToken(payload: UserPayload) {
    return this.jwt.sign(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      expiresIn: '30m'
    });
  }

  private getJwtRefreshToken(payload: UserPayload) {
    return this.jwt.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: '21d'
    });
  }
}
