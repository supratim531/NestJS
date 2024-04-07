import { Body, Controller, Get, HttpStatus, Param, ParseEnumPipe, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleType } from 'src/enums/role.enum';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) {
  }

  @Post()
  async create(
    @Body(ValidationPipe) createRoleDto: CreateRoleDto
  ) {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get(':role')
  async findByRole(
    @Param('role', new ParseEnumPipe(RoleType)) role: RoleType
  ) {
    return await this.roleService.findByRole(role);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) roleId: number,
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto
  ) {
    return await this.roleService.update(roleId, updateRoleDto);
  }
}
