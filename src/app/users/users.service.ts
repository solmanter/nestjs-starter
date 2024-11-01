import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'nestjs-drizzle/postgres';
import { usersTable } from './users.schema';

@Injectable()
export class UsersService {
  constructor(private drizzle: DrizzleService<ISchema>) { }

  getUsers() {
    return this.drizzle.get(usersTable);
  }
}
