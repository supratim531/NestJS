import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { employeeProvider } from './employee.provider';
import { DatabaseModule } from '../database/database.module';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    EmployeeService,
    ...employeeProvider
  ],
  controllers: [EmployeeController]
})
export class EmployeeModule {
}
