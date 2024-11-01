import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { TsRest } from '@ts-rest/nest';
import { usersRouter } from './users.router';
import { IsPublic } from '@libs/config/public.decorator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @IsPublic()
  @TsRest(usersRouter.getUsers)
  getUsers() {
    return this.usersService.getUsers();
  }
}
