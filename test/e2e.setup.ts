import { NestFastifyApplication, FastifyAdapter } from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import { MainModule } from "src/main.module";

export async function SetupTest() {
  const moduleRef = await Test.createTestingModule({
    imports: [MainModule],
  }).compile();

  const app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return app;
}