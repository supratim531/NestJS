import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {
  }

  async login(authUserDto: AuthUserDto) {
    const { username, password } = authUserDto;

    const user = await this.userRepository.findOne({
      where: {
        username
      }
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = await this.jwtService.signAsync({
        user: {
          userId: user.userId,
          username: user.username,
          email: user.email
        }
      });

      return {
        message: `Login successful ${username} 😊`,
        token
      }
    } else {
      throw new BadRequestException('Wrong username or password');
    }
  }

  async register(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return await this.userRepository.save({
      email,
      username,
      password: hashedPassword
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(userId, updateUserDto);
  }
}
