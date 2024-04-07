import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../role/role.service';
import { RoleType } from 'src/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService
  ) {
  }

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    const { email, username, password, confirmPassword } = registerUserDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('password and confirm password did not match');
    } else {
      const { role } = await this.roleService.findByRole(RoleType.USER);
      const user = new User();
      user.email = email;
      user.username = username;
      user.password = confirmPassword;
      user.role = role;
      const newUser = await this.userRepository.save(user);
      role.users = [...role.users, newUser];
      await role.save();

      // delete newUser.role;
      delete newUser.password;

      return {
        message: `User ${username} registered successfully`
      };
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {
        username
      },
      relations: ['role']
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = await this.jwtService.signAsync({
        user: {
          userId: user.userId,
          username: user.username,
          email: user.email,
          role: user.role.role
        }
      });

      return {
        message: `${username} logged in successfully 😊`,
        token
      }
    } else {
      throw new BadRequestException('Wrong username or password');
    }
  }

  async findAll(): Promise<{ users: User[] }> {
    const users = await this.userRepository.find({ relations: ['role'] });

    return {
      users
    };
  }

  async findById(userId: number): Promise<{ user: User }> {
    const user = await this.userRepository.findOne({
      where: {
        userId
      }
    });

    if (!user) {
      throw new NotFoundException(`no user found with userId ${userId}`);
    } else {
      return {
        user
      };
    }
  }

  async updateById(userId: number, updateUserDto: UpdateUserDto) {
    const { user } = await this.findById(userId);
    await this.userRepository.update(userId, updateUserDto);

    return {
      message: `user ${user.username} updated successfully`
    };
  }
}
