import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RoleType } from "src/enums/role-type.enum";

export class CreateRoleDto {
  @IsEnum(RoleType, { message: 'role must be ADMIN or EMPLOYEE' })
  @IsNotEmpty()
  roleType: RoleType;

  @IsString()
  @IsNotEmpty()
  roleDesc: string;
}
