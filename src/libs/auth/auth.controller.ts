import { Controller, UseGuards } from '@nestjs/common';
import { TsRest, TsRestRequest } from '@ts-rest/nest';
import { AuthService } from './auth.service';
import { authRouter } from './auth.router';
import { GetUser, IsPublic } from '@packages/config';
import { JwtRefreshGuard } from './jwt-refresh.guard';

@IsPublic()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @TsRest(authRouter.register)
  register(@TsRestRequest() request: TRequest<typeof authRouter.register>) {
    return this.authService.register(request);
  }

  @TsRest(authRouter.login)
  login(@TsRestRequest() { body }: TRequest<typeof authRouter.login>) {
    return this.authService.validateAccessToken(body.username, body.password);
  }

  @UseGuards(JwtRefreshGuard)
  @TsRest(authRouter.refresh)
  refresh(
    @TsRestRequest() { body }: TRequest<typeof authRouter.refresh>,
    @GetUser() payload: UserPayload
  ) {
    return this.authService.validateRefreshToken(body.refresh_token, payload);
  }
}
