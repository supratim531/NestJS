import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';

@Controller('option')
export class OptionController {
  constructor(
    private readonly optionService: OptionService
  ) {
  }

  @Get()
  async findAll() {
    return await this.optionService.findAll();
  }

  @Post()
  async create(
    @Body(ValidationPipe) createOptionDto: CreateOptionDto
  ) {
    return await this.optionService.create(createOptionDto);
  }
}
