import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
// import * as schema from '@libs/schema';

@Module({
  imports: [
    AuthModule
  ]
})
export class LibsModule { }