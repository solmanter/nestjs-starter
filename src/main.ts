import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix('/api');

  await app.listen({
    port: parseInt(process.env.APP_PORT) || 5200
  });

  console.log(`server running: ${(await app.getUrl()).replace('[::1]', '127.0.0.1')}`);
}
bootstrap();
