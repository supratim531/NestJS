import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService
  ) {
  }

  @Get()
  async findAll() {
    return await this.quizService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) quizId: number
  ) {
    return await this.quizService.findById(quizId);
  }

  @Post()
  async create(
    @Body(ValidationPipe) createQuizDto: CreateQuizDto
  ) {
    return await this.quizService.create(createQuizDto);
  }
}
