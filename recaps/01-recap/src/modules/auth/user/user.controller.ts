import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto, registerSchema } from './dto/register.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto, loginSchema } from './dto/login.dto';
import { AuthenticationGuard } from 'src/guards/auth/authentication.guard';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { RoleType } from 'src/enums/role-type.enum';
import { AuthorizationGuard } from 'src/guards/auth/authorization.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('register')
  @UsePipes(new JoiValidationPipe(registerSchema))
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('login')
  @UsePipes(new JoiValidationPipe(loginSchema))
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Get(':username')
  @Roles(RoleType.ADMIN)
  async findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Delete(':username')
  @Roles(RoleType.ADMIN)
  async deleteByUsername(@Param('username') username: string) {
    return this.userService.deleteByUsername(username);
  }
}
