import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async register(registerUserDto: RegisterUserDto) {
    const { email, username, password, confirmPassword } = registerUserDto;

    if (password !== confirmPassword) {
      throw new Error('password and confirm password did not match');
    } else {
      const newUser = new User();
      newUser.email = email;
      newUser.username = username;
      newUser.password = confirmPassword;
      await newUser.save();
      delete newUser.password;

      return {
        message: `User ${username} registered successfully`,
        user: {
          ...newUser
        }
      };
    }
  }

  async findAll() {
    const users = await this.userRepository.find();

    return {
      users
    };
  }
}
