import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get<{ [key: string]: number }>('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (serverConfig.NODE_ENV) {
    app.enableCors();
  }
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
