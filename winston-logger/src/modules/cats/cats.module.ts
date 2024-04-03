import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule.register('cats')],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
}
