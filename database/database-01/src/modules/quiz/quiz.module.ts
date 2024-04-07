import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { Question } from './question/question.entity';
import { QuestionController } from './question/question.controller';
import { QuestionService } from './question/question.service';
import { OptionService } from './option/option.service';
import { Option } from './option/option.entity';
import { OptionController } from './option/option.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Question, Option])
  ],
  controllers: [QuizController, QuestionController, OptionController],
  providers: [QuizService, QuestionService, OptionService],
})
export class QuizModule {
}
