import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;
}
