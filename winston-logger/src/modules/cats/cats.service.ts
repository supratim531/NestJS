import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class CatsService {
  constructor(
    private readonly loggerService: LoggerService
  ) {
  }

  findAll(city?: string) {
    if (city && city === 'kolkata') {
      throw new NotFoundException(`City ${city} not found`);
    } else if (city && city === 'pune') {
      throw new ForbiddenException(`City ${city} not found`);
    } else {
      return {
        message: `All cats`
      }
    }
  }
}
