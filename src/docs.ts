import { NestFactory } from '@nestjs/core';
import { generateOpenApi } from '@ts-rest/open-api';
import { SwaggerModule } from '@nestjs/swagger';
import { router } from '@libs/router';
import { Module } from '@nestjs/common';

@Module({})
class AppModule { }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(false);

  // Swagger
  const document = generateOpenApi(router, {
    info: {
      title: 'App API',
      version: '0.1.0',
    },
  });

  SwaggerModule.setup('/docs', app, document);
  await app.listen(process.env.DOCS_PORT || 6200);

  console.log(`Api docs server running: ${(await app.getUrl()).replace('[::1]', '127.0.0.1')}/docs`);
}
bootstrap();