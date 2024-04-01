import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { LoggerService } from "./logger/logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

type ErrorResponse = {
  statusCode: number,
  timestamp: string,
  path: string,
  error: string | object,
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger: LoggerService = new LoggerService(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const errorResponse: ErrorResponse = {
      statusCode: 200,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: ''
    };

    // Add more Prisma Error Types if you want
    if (exception instanceof HttpException) {
      errorResponse.statusCode = exception.getStatus();
      errorResponse.error = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      errorResponse.statusCode = 422;
      errorResponse.error = exception.message.replaceAll(/\n/g, ' ');
    } else {
      errorResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse.error = 'Internal Server Error';
    }

    response
      .status(errorResponse.statusCode)
      .json(errorResponse);

    this.logger.error(errorResponse.error, AllExceptionsFilter.name);
    super.catch(exception, host);
  }
}
