import { Module } from '@nestjs/common';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role/role.entity';
import { Employee } from './employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Employee])
  ],
  providers: [RoleService, EmployeeService],
  controllers: [RoleController, EmployeeController],
  exports: [EmployeeService]
})
export class EmployeeModule { }
