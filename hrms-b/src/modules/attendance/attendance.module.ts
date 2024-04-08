import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { EmployeeModule } from '../employee/employee.module';
import { AttendanceController } from './attendance.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
    EmployeeModule
  ],
  providers: [AttendanceService],
  controllers: [AttendanceController]
})
export class AttendanceModule { }
