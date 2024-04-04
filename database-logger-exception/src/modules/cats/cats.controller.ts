import { Body, Controller, Get, Patch, Post, UsePipes } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { UpdateCatDto, updateCatSchema } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {
  }

  @Get('')
  findAll() {
    return this.catsService.findAll();
  }

  @Get('log-test')
  logTest() {
    this.catsService.logTest();
    return {
      message: 'This is a log testing end-point'
    };
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Patch()
  @UsePipes(new JoiValidationPipe(updateCatSchema))
  update(@Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(updateCatDto);
  }
}
