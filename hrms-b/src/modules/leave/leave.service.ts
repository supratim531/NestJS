import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Leave } from './leave.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { EmployeeService } from '../employee/employee.service';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave)
    private readonly leaveRepository: Repository<Leave>,
    private readonly employeeService: EmployeeService
  ) { }

  async create(createLeaveDto: CreateLeaveDto) {
    const { employee } = await this.employeeService.findById(+createLeaveDto.employee);
    createLeaveDto.employee = employee;
    createLeaveDto['leaveStatus'] = Status.PENDING;

    const newLeave = await this.leaveRepository.save(createLeaveDto);
    employee.leaves = [...employee.leaves, newLeave];
    await employee.save();

    return {
      message: `a brand new leave request is generated for ${employee.username} (${newLeave.startDate} - ${newLeave.endDate}) [${newLeave.leaveStatus}]`
    };
  }

  async findAll() {
    const leaves = await this.leaveRepository.find();

    return {
      leaves
    };
  }

  async findById(leaveId: number) {
    const leave = await this.leaveRepository.findOne({
      where: {
        leaveId
      },
      relations: ['employee']
    });

    if (!leave) {
      throw new NotFoundException(`no leave exists with leaveId ${leaveId}`);
    } else {
      return {
        leave
      };
    }
  }

  async findByEmpId(empId: number) {
    const { employee } = await this.employeeService.findById(empId);
    const leaves = await this.leaveRepository.find({
      where: {
        employee: {
          empId
        }
      }
    });

    if (!leaves.length) {
      throw new NotFoundException(`no leave exists for employee ${employee.username} (${employee.firstName} ${employee.lastName})`);
    } else {
      return {
        leaves
      };
    }
  }

  async updateById(leaveId: number, updateLeaveDto: UpdateLeaveDto) {
    const { leave } = await this.findById(leaveId);
    await this.leaveRepository.update(leaveId, updateLeaveDto);
    const updatedLeave = await this.findById(leaveId);

    return {
      message: `leave request of ${leave.employee.username} updated successfully [${updatedLeave.leave.leaveStatus}]`
    };
  }
}
