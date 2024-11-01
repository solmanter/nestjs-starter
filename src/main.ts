import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix('/api');

  await app.listen({
    port: parseInt(process.env.PORT) || 5200
  });

  console.log(`server running: ${(await app.getUrl()).replace('[::1]', '127.0.0.1')}`);
}
bootstrap();
