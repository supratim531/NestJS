import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService
  ) { }

  @Post()
  async create(
    @Body(ValidationPipe) createAttendanceDto: CreateAttendanceDto
  ) {
    return await this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  async findAll(
    @Query('empId') empId?: string
  ) {
    if (empId) {
      return await this.attendanceService.findByEmpId(+empId);
    } else {
      return await this.attendanceService.findAll();
    }
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) attId: number,
    @Body(ValidationPipe) updateAttendanceDto: UpdateAttendanceDto
  ) {
    return await this.attendanceService.updateById(attId, updateAttendanceDto);
  }
}
