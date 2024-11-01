import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TsRest, TsRestRequest } from '@ts-rest/nest';
import { authRouter } from './auth.router';
import { GetUser } from '@libs/config/get-user.decorator';
import { IsPublic } from '@libs/config/public.decorator';
import { JwtRefreshGuard } from './jwt-refresh.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @IsPublic()
  @TsRest(authRouter.login)
  login(@TsRestRequest() { body }: TRequest<typeof authRouter.login>) {
    return this.authService.validateAccessToken(body.username, body.password);
  }

  @IsPublic()
  @UseGuards(JwtRefreshGuard)
  @TsRest(authRouter.refresh)
  refresh(
    @TsRestRequest() { body }: TRequest<typeof authRouter.refresh>,
    @GetUser() payload: UserPayload
  ) {
    return this.authService.validateRefreshToken(body.refresh_token, payload);
  }
}
