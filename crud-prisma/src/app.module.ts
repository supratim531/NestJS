import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([
      {
        name: "shortWalaThrottler",
        ttl: 10000,
        limit: 5
      },
      {
        name: "longWalaThrottler",
        ttl: 10000,
        limit: 10
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {
}
