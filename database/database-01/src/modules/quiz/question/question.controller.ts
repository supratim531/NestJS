import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService
  ) {
  }

  @Post()
  async create(
    @Body() createQuestionDto: CreateQuestionDto
  ) {
    return await this.questionService.create(createQuestionDto);
  }

  @Get()
  async findAll() {
    return await this.questionService.findAll();
  }
}
