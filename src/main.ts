
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';


async function bootstrap() {
  const serverConfig = config.get('server');
  
  const logger = new Logger();
  const port = process.env.PORT || serverConfig.port;
  
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }
  
  app.enableCors();
  
  await app.listen(port);
  logger.log(`Application listens to port ${port}`);
}
bootstrap();
