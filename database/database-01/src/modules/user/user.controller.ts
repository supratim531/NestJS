import { Body, Controller, Get, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

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

  @Post('register')
  async register(
    @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }))
    registerUserDto: RegisterUserDto
  ) {
    return await this.userService.register(registerUserDto);
  }
}
