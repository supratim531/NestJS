import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService]
})
export class LoggerModule {
  static register(context: string): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useValue: context ? new LoggerService(context) : new LoggerService('HTTP')
        },
      ],
      exports: [LoggerService],
    };
  }
}
