import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { Request, Response } from 'express';

type ErrorResponse = {
  method: string;
  statusCode: number;
  path: string;
  timestamp: Date;
  error: string | object;
  expiredAt?: Date;
  stack?: string;
};

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    let errorResponse: ErrorResponse;

    if (exception instanceof HttpException) {
      errorResponse = this.getErrorResponse(
        request,
        exception.getStatus(),
        exception.getResponse(),
      );
    } else if (exception instanceof TokenExpiredError) {
      errorResponse = this.getErrorResponse(
        request,
        HttpStatus.UNAUTHORIZED,
        exception.message,
        exception.stack,
        exception.expiredAt,
      );
    } else if (exception instanceof JsonWebTokenError) {
      errorResponse = this.getErrorResponse(
        request,
        HttpStatus.UNAUTHORIZED,
        exception.message,
        exception.stack,
      );
    } else if (exception instanceof Error) {
      errorResponse = this.getErrorResponse(
        request,
        HttpStatus.INTERNAL_SERVER_ERROR,
        exception.message,
        exception.stack,
      );
    } else {
      errorResponse = this.getErrorResponse(
        request,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        (exception as Error).stack,
      );
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private getErrorResponse(
    request: Request,
    status: HttpStatus,
    error: string | object,
    stack?: string,
    expiredAt?: Date,
  ): ErrorResponse {
    return {
      method: request.method,
      statusCode: status,
      path: request.url,
      timestamp: new Date(),
      error: error,
      expiredAt,
      stack,
    };
  }
}
