import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body(ValidationPipe) createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  async findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) roleId: number) {
    return this.roleService.findById(roleId);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) roleId: number,
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.updateById(roleId, updateRoleDto);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) roleId: number) {
    return this.roleService.deleteById(roleId);
  }
}
