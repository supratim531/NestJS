import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { EmployeeService } from '../employee/employee.service';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    private readonly employeeService: EmployeeService
  ) { }

  async create(createAttendanceDto: CreateAttendanceDto) {
    const { employee } = await this.employeeService.findById(+createAttendanceDto.employee);
    createAttendanceDto.employee = employee;
    createAttendanceDto['attStatus'] = Status.PENDING;

    const newAttendance = await this.attendanceRepository.save(createAttendanceDto);
    employee.attendances = [...employee.attendances, newAttendance];
    await employee.save();

    return {
      message: `a brand new check-in request is generated for ${employee.username} at ${newAttendance.checkIn} [${newAttendance.attStatus}]`
    };
  }

  async findAll() {
    const attendances = await this.attendanceRepository.find();

    return {
      attendances
    };
  }

  async findById(attId: number) {
    const attendance = await this.attendanceRepository.findOne({
      where: {
        attId
      },
      relations: ['employee']
    });

    if (!attendance) {
      throw new NotFoundException(`no attendance exists with attId ${attId}`);
    } else {
      return {
        attendance
      };
    }
  }

  async findByEmpId(empId: number) {
    const { employee } = await this.employeeService.findById(empId);
    const attendances = await this.attendanceRepository.find({
      where: {
        employee: {
          empId
        }
      }
    });

    if (!attendances.length) {
      throw new NotFoundException(`no attendance exists for employee ${employee.username} (${employee.firstName} ${employee.lastName})`);
    } else {
      return {
        attendances
      };
    }
  }

  async updateById(attId: number, updateAttendanceDto: UpdateAttendanceDto) {
    const { attendance } = await this.findById(attId);
    await this.attendanceRepository.update(attId, updateAttendanceDto);
    const updatedAttendance = await this.findById(attId);

    return {
      message: `attendance request of ${attendance.employee.username} updated successfully [${updatedAttendance.attendance.attStatus}]`
    };
  }
}
