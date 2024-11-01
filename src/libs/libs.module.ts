import { Module } from "@nestjs/common";

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    // DrizzleModule.forAsyncRoot({
    //   isGlobal: true,
    //   useFactory: async (config: ConfigService) => ({
    //     connection: config.get('DATABASE_URL'),
    //     schema,
    //   }),
    //   inject: [ConfigService]
    // }),
  ]
})
export class LibsModule { }