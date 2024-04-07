import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>
  ) {
  }

  async create(createQuizDto: CreateQuizDto) {
    return await this.quizRepository.save(createQuizDto);
  }

  // async findAll() {
  //   return await this.quizRepository.find({
  //     relations: ['questions', 'questions.options']
  //   });
  // }

  async findAll() {
    return await this.quizRepository
      .createQueryBuilder('qz')
      .innerJoinAndSelect('qz.questions', 'qt')
      // .innerJoinAndSelect('qt.options', 'opt')
      .getMany();
  }

  async findById(quizId: number) {
    return await this.quizRepository.findOne({
      where: {
        quizId
      },
      relations: ['questions', 'questions.options']
    });
  }
}
