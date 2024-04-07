import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length } from "class-validator";
import { Role } from "src/modules/role/role.entity";

export class CreateUserDto {
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
