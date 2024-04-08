import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length } from "class-validator";
import { Role } from "../role/role.entity";

export class CreateEmployeeDto {
  @Length(2, 200)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Length(2, 200)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @Length(8, 60)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  role: Role;
}
