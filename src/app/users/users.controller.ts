import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { TsRest } from '@ts-rest/nest';
import { usersRouter } from './users.router';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @TsRest(usersRouter.getUsers)
  getUsers() {
    return this.usersService.getUsers();
  }
}
