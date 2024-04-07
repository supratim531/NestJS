import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthenticationGuard } from 'src/guards/auth/authentication.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthorizationGuard } from 'src/guards/auth/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleType } from 'src/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @Post('register')
  async register(
    @Body(ValidationPipe) registerUserDto: RegisterUserDto
  ) {
    return await this.userService.register(registerUserDto);
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) loginUserDto: LoginUserDto
  ) {
    return await this.userService.login(loginUserDto);
  }

  @Roles(RoleType.ADMIN, RoleType.USER)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) userId: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto
  ) {
    return await this.userService.updateById(userId, updateUserDto);
  }
}
