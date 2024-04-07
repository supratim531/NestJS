import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleType } from 'src/enums/role.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {
  }

  async create(createRoleDto: CreateRoleDto): Promise<any> {
    const role = await this.roleRepository.save(createRoleDto);
    return {
      message: `Role ${role.role} created`,
      role
    };
  }

  async findAll(): Promise<any> {
    const roles = await this.roleRepository.find({ relations: ['users'] });
    return {
      roles
    };
  }

  async findById(roleId: number): Promise<{ role: Role }> {
    const role = await this.roleRepository.findOne({
      where: {
        roleId
      }
    });

    if (!role) {
      throw new NotFoundException(`role not found with roleId ${roleId}`);
    } else {
      return {
        role
      };
    }
  }

  async findByRole(role: RoleType): Promise<{ role: Role }> {
    const _role = await this.roleRepository.findOne({
      where: {
        role
      },
      relations: ['users']
    });

    if (!_role) {
      throw new NotFoundException(`role ${role} not found`);
    } else {
      return {
        role: _role
      };
    }
  }

  async update(roleId: number, updateRoleDto: UpdateRoleDto): Promise<any> {
    const { role } = await this.findById(roleId);
    await this.roleRepository.update(roleId, updateRoleDto);

    return {
      message: `role ${role.role} updated successfully`
    };
  }
}
