import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService extends Logger {
  private readonly logger: winston.Logger;

  constructor(context: string) {
    super(context);

    this.logger = winston.createLogger({
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: `logs/${context}/info`,
          filename: '%DATE%.log',
          datePattern: 'DD-MM-YYYY',
          level: 'info',
          zippedArchive: true,
          format: winston.format.combine(
            winston.format.printf(({ timestamp, level, message, context, trace }) => {
              return `${timestamp}\t[${context}]\t${level}:\t${message}\t${trace ? `\n${trace}` : ''}`;
            })
          ),
        }),
        new winston.transports.DailyRotateFile({
          dirname: `logs/${context}/debug`,
          filename: '%DATE%-debug.log',
          datePattern: 'DD-MM-YYYY',
          level: 'debug',
          zippedArchive: true,
          format: winston.format.combine(
            winston.format.printf(({ timestamp, level, message, context, trace }) => {
              return `${timestamp}\t[${context}]\t${level}:\t${message}\t${trace ? `\n${trace}` : ''}`;
            })
          ),
        }),
        new winston.transports.DailyRotateFile({
          dirname: `logs/${context}/error`,
          filename: '%DATE%-error.log',
          datePattern: 'DD-MM-YYYY',
          level: 'error',
          zippedArchive: true,
          format: winston.format.combine(
            winston.format.printf(({ timestamp, level, message, context, trace }) => {
              return `${timestamp}\t[${context}]\t${level}:\t${message}\t${trace ? `\n${trace}` : ''}`;
            })
          ),
        }),
      ],
    });
  }

  log(message: any, context?: string): void {
    this.logger.info(message, context);
  }

  error(message: any, stack?: string, context?: string): void {
    this.logger.error(message, stack, context);
  }

  debug(message: any, context?: string): void {
    this.logger.debug(message, context);
  }
}
