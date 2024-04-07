import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuizService } from '../quiz.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly quizService: QuizService
  ) {
  }

  async create(createQuestionDto: CreateQuestionDto) {
    const quiz = await this.quizService.findById(createQuestionDto.quiz.quizId);
    const newQuestion = await this.questionRepository.save(createQuestionDto);
    quiz.questions = [...quiz.questions, newQuestion];
    await quiz.save();
    return newQuestion;
  }

  async findAll() {
    return await this.questionRepository.find({
      relations: ['options']
    });
  }

  async findById(questionId: number) {
    return await this.questionRepository.findOne({
      where: {
        questionId
      },
      relations: ['options']
    });
  }
}
