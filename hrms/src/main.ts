import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './exception-filters/all-exception.filter';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('HRMS-API')
    .setDescription('This could be a better description for HRMS-API')
    .setVersion('1.0')
    .addTag('HRMS')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  }));
  app.useGlobalFilters(new AllExceptionFilter());

  SwaggerModule.setup('swagger', app, swaggerDocument);
  await app.listen(3000);
}

bootstrap();
