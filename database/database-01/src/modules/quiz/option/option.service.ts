import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Option } from './option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOptionDto } from './dto/create-option.dto';
import { QuestionService } from '../question/question.service';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    private readonly questionService: QuestionService
  ) {
  }

  async create(createOptionDto: CreateOptionDto) {
    const question = await this.questionService.findById(createOptionDto.question.questionId);
    const newOption = await this.optionRepository.save(createOptionDto);
    question.options = [...question.options, newOption];
    await question.save();
    return newOption;
  }

  async findAll() {
    return await this.optionRepository.find();
  }
}
