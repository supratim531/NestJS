import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { LoggerService } from "src/modules/logger/logger.service";

type ErrorResponse = {
  method: string;
  statusCode: number;
  path: string;
  timestamp: Date;
  error: string | object;
  stack?: string;
}

export class AllExceptionFilter implements ExceptionFilter {
  private readonly loggerService: LoggerService = new LoggerService(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    let errorResponse: ErrorResponse;

    if (exception instanceof HttpException) {
      errorResponse = this.getErrorResponse(
        request,
        exception.getStatus(),
        exception.getResponse()
      );
    } else if (exception instanceof Error) {
      errorResponse = this.getErrorResponse(
        request,
        HttpStatus.INTERNAL_SERVER_ERROR,
        exception.message,
        exception.stack
      );
    } else {
      errorResponse = this.getErrorResponse(
        request,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        (exception as Error).stack
      );
    }

    this.loggerService.error(`${request.headers["user-agent"]}\t(${request.ip})\t${errorResponse.method}\t${errorResponse.statusCode}\t${errorResponse.path}\t-\t${JSON.stringify(errorResponse.error)}`);
    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private getErrorResponse(
    request: Request,
    status: HttpStatus,
    error: string | object,
    stack?: string
  ): ErrorResponse {
    return {
      method: request.method,
      statusCode: status,
      path: request.url,
      timestamp: new Date(),
      error: error,
      stack
    };
  }
}
