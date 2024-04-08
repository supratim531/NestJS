import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Controller('leave')
export class LeaveController {
  constructor(
    private readonly leaveService: LeaveService
  ) { }

  @Post()
  async create(
    @Body(ValidationPipe) createLeaveDto: CreateLeaveDto
  ) {
    return await this.leaveService.create(createLeaveDto);
  }

  @Get()
  async findAll(
    @Query('empId') empId?: string
  ) {
    if (empId) {
      return await this.leaveService.findByEmpId(+empId);
    } else {
      return await this.leaveService.findAll();
    }
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) leaveId: number,
    @Body(ValidationPipe) updateLeaveDto: UpdateLeaveDto
  ) {
    return await this.leaveService.updateById(leaveId, updateLeaveDto);
  }
}
