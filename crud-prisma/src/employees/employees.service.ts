import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {
  }

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto
    });
  }

  async findAll(role?: 'MANAGER' | 'HR' | 'PERMANENT' | 'INTERN') {
    if (role) {
      return this.databaseService.employee.findMany({
        where: {
          role,
        }
      });
    } else {
      return this.databaseService.employee.findMany();
    }
  }

  async findOne(id: string) {
    return this.databaseService.employee.findUnique({
      where: {
        empId: id
      }
    });
  }

  async update(id: string, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        empId: id
      },
      data: updateEmployeeDto
    });
  }

  async removeAll() {
    return this.databaseService.employee.deleteMany();
  }

  async remove(id: string) {
    return this.databaseService.employee.delete({
      where: {
        empId: id
      }
    });
  }
}
