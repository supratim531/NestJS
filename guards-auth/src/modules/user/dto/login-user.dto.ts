import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginUserDto {
  @Length(8, 60)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
