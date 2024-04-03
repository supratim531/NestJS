import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './exception-filters/all-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true
  // }));
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(3000);
}

bootstrap();
