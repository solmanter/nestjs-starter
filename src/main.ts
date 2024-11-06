import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { generateOpenApi } from '@ts-rest/open-api';
import { SwaggerModule } from '@nestjs/swagger';

import { GlobalExceptionFilter } from '@packages/config';
import { RouterContract } from '@packages/router/contract';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
    { logger: ['error', 'verbose', 'warn', 'debug', 'fatal'], },
  );

  app.setGlobalPrefix('/api');

  // Docs
  const openApiDocument = generateOpenApi(RouterContract, {
    info: {
      title: 'App API',
      version: '0.0.1',
    },
  });

  SwaggerModule.setup('/docs', app, openApiDocument);

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen({
    port: process.env.APP_PORT || 5200
  });

  console.log(`server running: ${(await app.getUrl()).replace('[::1]', '127.0.0.1')}`);
}
bootstrap();
