import { AppModule } from '@app/app.module';
import { LibsModule } from '@libs/libs.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from 'nestjs-drizzle/postgres';
import * as schema from '@packages/schema'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule.forRoot({ schema }),
    // Modules
    LibsModule,
    AppModule
  ],
  controllers: [],
  providers: [],
})
export class MainModule { }
