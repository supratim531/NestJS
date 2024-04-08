import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length } from "class-validator";
import { Role } from "../role/role.entity";

/*
const payload = {
  "firstName": "Angshuman",
  "lastName": "Mondal",
  "email": "angshuman.mondal@gmail.com",
  "username": "angshuman123",
  "password": "Test@2024",
  "role": 1
}
*/

/**
 * @author Supratim Majumder
 * @description request-body to create a employee. Demo payload is given above the class
 */
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
