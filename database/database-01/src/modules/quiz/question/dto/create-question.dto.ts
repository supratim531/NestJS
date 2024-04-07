import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Quiz } from "../../quiz.entity";

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsNumber()
  @IsNotEmpty()
  quiz: Quiz;
}
