import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleType } from 'src/enums/role-type.enum';

export class CreateRoleDto {
  @IsEnum(RoleType, { message: 'roleType must be USER or ADMIN' })
  @IsNotEmpty()
  roleType: RoleType;

  @IsString()
  @IsNotEmpty()
  roleDesc: string;
}
