import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Role } from '../../role/role.entity';

export class CreateUserDto {
  @Length(3, 100)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Length(3, 100)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @Length(8, 100)
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  role: Role;
}
