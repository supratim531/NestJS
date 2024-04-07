import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Option } from "src/modules/quiz/option/option.entity";
import { Question } from "src/modules/quiz/question/question.entity";
import { Quiz } from "src/modules/quiz/quiz.entity";
import { User } from "src/modules/user/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nest_test',
  entities: [Quiz, Question, Option, User],
  synchronize: true,
  logging: true
};
