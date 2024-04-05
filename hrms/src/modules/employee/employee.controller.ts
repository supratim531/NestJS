import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService
  ) {
  }

  @Get()
  async findAll() {
    return await this.employeeService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) empId: number) {
    return await this.employeeService.findById(empId);
  }

  @Post()
  async create(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeService.create(createEmployeeDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) empId: number,
    @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto
  ) {
    return await this.employeeService.update(empId, updateEmployeeDto);
  }
}
