import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateEmployeeDto {
  @IsEmail()
  empEmail: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 60, { message: 'username must be of 8 to 60 characters' })
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
