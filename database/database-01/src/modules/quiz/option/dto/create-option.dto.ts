import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Question } from "../../question/question.entity";

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  option: string;

  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;

  @IsNumber()
  @IsNotEmpty()
  question: Question;
}
