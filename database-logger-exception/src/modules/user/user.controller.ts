import { Body, Controller, Get, Param, Patch, Post, Res, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { UpdateUserDto, updateUserSchema } from './dto/update-user.dto';
import { AuthUserDto, authUserSchema } from './dto/auth-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe(updateUserSchema))
  async update(@Param('id') userId: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(userId, updateUserDto);
  }

  @Post('login')
  @UsePipes(new JoiValidationPipe(authUserSchema))
  async login(
    @Body() authUserDto: AuthUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const result = await this.userService.login(authUserDto);
    response.cookie('token', result.token, { httpOnly: true });

    return {
      message: result.message
    }
  }

  @Post('register')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }
}
