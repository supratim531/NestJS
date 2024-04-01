import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['ADMIN', 'USER'], {
    message: 'valid role required [ADMIN or USER]'
  })
  role: 'ADMIN' | 'USER';
}
