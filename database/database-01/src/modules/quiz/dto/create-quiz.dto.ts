import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateQuizDto {
  @MaxLength(200)
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
