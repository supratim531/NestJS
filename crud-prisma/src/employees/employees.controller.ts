import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
import { SkipThrottle } from '@nestjs/throttler';
import { LoggerService } from 'src/logger/logger.service';

@SkipThrottle({ shortWalaThrottler: true, longWalaThrottler: true })
@Controller('employees')
export class EmployeesController {
  private readonly logger: LoggerService = new LoggerService(EmployeesController.name);

  constructor(private readonly employeesService: EmployeesService) {
  }

  @Post()
  async create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({
    shortWalaThrottler: false
  })
  @Get()
  async findAll(
    @Ip() ip: string,
    @Query('role') role?: 'MANAGER' | 'HR' | 'PERMANENT' | 'INTERN'
  ) {
    this.logger.log(`Request for all employees\t${ip}`, EmployeesController.name);
    return this.employeesService.findAll(role);
  }

  @SkipThrottle({
    longWalaThrottler: false
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete()
  async removeAll() {
    return this.employeesService.removeAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
