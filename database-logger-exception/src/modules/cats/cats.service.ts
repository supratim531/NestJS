import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { LoggerService } from '../logger/logger.service';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    private readonly logger: LoggerService
  ) {
  }

  findAll() {
    if (0) {
      throw new Error('Something wrong happened');
    } else {
      const temp = undefined;
      temp.at(3);

      return {
        message: 'All cats'
      }
    }
  }

  create(createCatDto: CreateCatDto) {
    return {
      message: 'A new cat created',
      cat: createCatDto
    }
  }

  update(updateCatDto: UpdateCatDto) {
    return {
      message: 'A new cat updated',
      cat: updateCatDto
    }
  }

  logTest() {
    this.logger.log('This is info log form CatsService', CatsService.name);
    this.logger.debug('This is debug log form CatsService', CatsService.name);
    this.logger.error('This is error log form CatsService', '', CatsService.name);
  }
}
