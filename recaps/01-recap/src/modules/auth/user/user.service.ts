import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { RoleService } from '../role/role.service';
import { RoleType } from 'src/enums/role-type.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { role } = await this.roleService.findById(+createUserDto.role);
    createUserDto.role = role;
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userRepository.save(createUserDto);
    role.users = [...role.users, newUser];
    await role.save();

    return {
      message: `user ${newUser.username} (${newUser.firstName} ${newUser.lastName}) created successfully [${newUser.role.roleType}]`,
    };
  }

  async register(registerDto: RegisterDto) {
    const { firstName, lastName, email, username, password } = registerDto;
    const { role } = await this.roleService.findByRoleType(RoleType.USER);

    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.username = username;
    newUser.password = password;
    newUser.role = role;

    await newUser.save();
    role.users = [...role.users, newUser];
    await role.save();

    return {
      message: `user ${newUser.username} (${newUser.firstName} ${newUser.lastName}) registered successfully [${newUser.role.roleType}]`,
    };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const { user } = await this.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = await this.jwtService.signAsync({
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          roleType: user.role.roleType,
        },
      });

      return {
        message: `user ${user.username} (${user.firstName} ${user.lastName}) logged in successfully 😊`,
        accessToken,
      };
    } else {
      throw new BadRequestException('wrong username or password');
    }
  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: ['role'],
    });

    if (!users.length) {
      throw new NotFoundException('No user exists');
    }

    return { users };
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`user ${username} not found`);
    }

    return { user };
  }

  async deleteByUsername(username: string) {
    const { user } = await this.findByUsername(username);
    await user.remove();

    return {
      message: `user ${user.username} deactivated successfully`,
    };
  }
}
