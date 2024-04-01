import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {
  }

  @Get()
  findAll(@Query('role') role?: 'ADMIN' | 'USER') {
    return {
      error: false,
      users: this.usersService.findAll(role)
    };
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) userId: number
  ) {
    return {
      error: false,
      user: this.usersService.findOne(userId)
    };
  }

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const newUser = this.usersService.create(createUserDto);

    return {
      error: false,
      message: `New user created with id ${newUser.userId}`,
      user: newUser
    };
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) userId: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto
  ) {
    const updatedUser = this.usersService.update(userId, updateUserDto);

    return {
      error: false,
      message: `User with id ${userId} updated successfully`,
      user: updatedUser
    };
  }

  @Delete()
  removeAll() {
    const removedUsers = this.usersService.removeAll();

    return {
      error: false,
      message: `All users removed successfully`,
      users: removedUsers
    };
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) userId: number
  ) {
    const removedUser = this.usersService.remove(userId);

    return {
      error: false,
      message: `User with id ${userId} removed successfully`,
      user: removedUser
    };
  }
}
