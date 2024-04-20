import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role/role.entity';
import { User } from './user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  providers: [UserService, RoleService],
  controllers: [UserController, RoleController],
})
export class AuthModule {}
