import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeRepository: Repository<Employee>
  ) {
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeRepository.save(createEmployeeDto);
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findById(empId: number) {
    return await this.employeeRepository.findOne({
      where: {
        empId
      }
    });
  }

  async update(empId: number, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeeRepository.update(empId, updateEmployeeDto);
  }
}
