import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
// import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   bufferLogs: true
  // });
  // app.useLogger(app.get(LoggerService));
  // app.enableCors();
  // app.setGlobalPrefix('api/v1');
  // await app.listen(3000);

  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}

bootstrap();
