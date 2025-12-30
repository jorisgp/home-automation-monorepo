import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api';
  const PORT_NUMBER = 3000;
  const log = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Home Automation API')
    .setDescription('Home Automation API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  log.verbose(
    `🚀 Application is running on: http://localhost:${PORT_NUMBER}/${GLOBAL_PREFIX}`
  );
  await app.listen(PORT_NUMBER);
}

bootstrap();
