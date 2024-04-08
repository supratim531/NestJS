import { IsNotEmpty, IsString } from "class-validator";

/*
const payload = {
  "username": "angshuman123",
  "password": "Test@2024"
}
*/

/**
 * @author Supratim Majumder
 * @description request-body to login. Demo payload is given above the class
 */
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
