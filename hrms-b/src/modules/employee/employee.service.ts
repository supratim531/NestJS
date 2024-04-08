import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from './role/role.service';
import { RegisterDto } from './dto/register.dto';
import { RoleType } from 'src/enums/role-type.enum';
import { LoginDto } from './dto/login.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { password } = createEmployeeDto;
    const { role } = await this.roleService.findById(+createEmployeeDto.role);
    createEmployeeDto.role = role;
    createEmployeeDto.password = await bcrypt.hash(password, 10);

    const newEmployee = await this.employeeRepository.save(createEmployeeDto);
    role.employees = [...role.employees, newEmployee];
    await role.save();

    return {
      message: `employee ${newEmployee.username} (${newEmployee.firstName} ${newEmployee.lastName}) created successfully [${newEmployee.role.roleType}]`
    };
  }

  async register(registerDto: RegisterDto) {
    const { firstName, lastName, email, username, password } = registerDto;
    const { role } = await this.roleService.findByRoleType(RoleType.EMPLOYEE);

    const newEmployee = new Employee();
    newEmployee.firstName = firstName;
    newEmployee.lastName = lastName;
    newEmployee.email = email;
    newEmployee.username = username;
    newEmployee.password = password;
    newEmployee.role = role;

    await newEmployee.save();
    role.employees = [...role.employees, newEmployee];
    await role.save();

    return {
      message: `employee ${newEmployee.username} (${newEmployee.firstName} ${newEmployee.lastName}) registered successfully [${newEmployee.role.roleType}]`
    };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const employee = await this.employeeRepository.findOne({
      where: {
        username
      },
      relations: ['role']
    });

    if (employee && await bcrypt.compare(password, employee.password)) {
      const token = await this.jwtService.signAsync({
        employee: {
          empId: employee.empId,
          firstName: employee.firstName,
          lastName: employee.lastName,
          username: employee.username,
          email: employee.email,
          roleType: employee.role.roleType
        }
      });

      return {
        message: `employee ${employee.username} (${employee.firstName} ${employee.lastName}) logged in successfully 😊`,
        token
      }
    } else {
      throw new BadRequestException('wrong username or password');
    }
  }

  async findAll() {
    const employees = await this.employeeRepository.find({
      relations: ['role']
    });

    return {
      employees
    };
  }

  async findById(empId: number) {
    const employee = await this.employeeRepository.findOne({
      where: {
        empId
      },
      relations: ['role']
    });

    if (!employee) {
      throw new NotFoundException(`no employee exists with empId ${empId}`);
    } else {
      return {
        employee
      };
    }
  }

  async updateById(empId: number, updateEmployeeDto: UpdateEmployeeDto) {
    const { employee } = await this.findById(empId);
    const { role } = await this.roleService.findById(+updateEmployeeDto.role);
    updateEmployeeDto.role = role;
    await this.employeeRepository.update(empId, updateEmployeeDto);

    return {
      message: `employee ${employee.username} (${employee.firstName} ${employee.lastName}) updated successfully`
    };
  }
}
