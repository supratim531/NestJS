import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CreateCatDto2, createCatSchema } from './dto/create-cat2.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { LoggerService } from '../logger/logger.service';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly loggerService: LoggerService
  ) {
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
  create(
    @Body() createCatDto2: CreateCatDto2
    // @Body(ValidationPipe) createCatDto: CreateCatDto
  ) {
    // throw new HttpException({
    //   errors: [
    //     'Email must be a valid email'
    //   ]
    // }, HttpStatus.BAD_REQUEST);
    this.loggerService.log('A new cat inserted', 'CATS');
    return {
      message: 'A new cat inserted'
    }
  }

  @Get()
  findAll(@Query('city') city?: string) {
    city.charAt(1);
    return this.catsService.findAll(city);
  }
}
