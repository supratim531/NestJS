import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";

export class RegisterDto {
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
}
