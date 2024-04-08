import { Body, Controller, Get, Param, ParseEnumPipe, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleType } from 'src/enums/role-type.enum';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) { }

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

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) roleId: number
  ) {
    return await this.roleService.findById(roleId);
  }

  @Get(':role')
  async findByRoleType(
    @Param('role', new ParseEnumPipe(RoleType)) roleType: RoleType
  ) {
    return await this.roleService.findByRoleType(roleType);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) roleId: number,
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto
  ) {
    return await this.roleService.updateById(roleId, updateRoleDto);
  }
}
