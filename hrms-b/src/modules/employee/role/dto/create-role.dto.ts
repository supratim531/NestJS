import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RoleType } from "src/enums/role-type.enum";

/*
const payload = {
  "roleType": "ADMIN",
  "roleDesc": "This role is for Admin & HR"
}
*/

/**
 * @author Supratim Majumder
 * @description request-body to create a role. Demo payload is given above the class
 */
export class CreateRoleDto {
  @IsEnum(RoleType, { message: 'roleType must be ADMIN or EMPLOYEE' })
  @IsNotEmpty()
  roleType: RoleType;

  @IsString()
  @IsNotEmpty()
  roleDesc: string;
}
