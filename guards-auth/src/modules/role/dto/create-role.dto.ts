import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RoleType } from "src/enums/role.enum";

export class CreateRoleDto {
  @IsEnum(RoleType, { message: 'role must be USER or ADMIN' })
  @IsNotEmpty()
  role: RoleType;

  @IsString()
  @IsNotEmpty()
  roleDesc: string;
}
