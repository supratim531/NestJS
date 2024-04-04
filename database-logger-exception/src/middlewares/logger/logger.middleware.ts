import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from 'src/modules/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: LoggerService = new LoggerService('http-request');

  use(req: Request, res: Response, next: NextFunction) {
    const { hostname, ip, body, originalUrl, method } = req;
    const startTime = new Date().getTime();

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const endTime = new Date().getTime();
      const entry = `${hostname}\t[${ip}]\t${method}\t${originalUrl}\tbody:\t${JSON.stringify(body)}\tresponse:\t${statusCode}\t(${statusMessage})\t${endTime - startTime} ms`;

      if (statusCode >= 400 && statusCode <= 500) {
        this.logger.error(entry);
      } else {
        this.logger.log(entry);
      }
    });

    next();
  }
}
