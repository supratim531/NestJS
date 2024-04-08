import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleType } from 'src/enums/role-type.enum';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.save(createRoleDto);

    return {
      message: `role ${role.roleType} created successfully`,
      role
    };
  }

  async findAll() {
    const roles = await this.roleRepository.find();

    return {
      roles
    };
  }

  async findById(roleId: number) {
    const role = await this.roleRepository.findOne({
      where: {
        roleId
      },
      relations: ['employees']
    });

    if (!role) {
      throw new NotFoundException(`no role exists with roleId ${roleId}`);
    } else {
      return {
        role
      };
    }
  }

  async findByRoleType(roleType: RoleType) {
    const role = await this.roleRepository.findOne({
      where: {
        roleType
      },
      relations: ['employees']
    });

    if (!role) {
      throw new NotFoundException(`role ${roleType} not found`);
    } else {
      return {
        role
      };
    }
  }

  async updateById(roleId: number, updateRoleDto: UpdateRoleDto) {
    const { role } = await this.findById(roleId);
    await this.roleRepository.update(roleId, updateRoleDto);

    return {
      message: `role ${role.roleType} updated successfully`
    };
  }
}
