import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      userId: 1,
      name: 'Sayan Das',
      email: 'sayan@gmail.com',
      role: 'ADMIN'
    },
    {
      userId: 2,
      name: 'Supratim Das',
      email: 'supratim@gmail.com',
      role: 'ADMIN'
    },
    {
      userId: 3,
      name: 'Ayan Das',
      email: 'ayan@gmail.com',
      role: 'USER'
    }
  ];

  findAll(role?: 'ADMIN' | 'USER'): User[] {
    if (role) {
      const usersByRole = this.users.filter(user => role === user.role);
      if (!usersByRole.length) {
        throw new NotFoundException(`No users found with role ${role}`);
      } else {
        return usersByRole;
      }
    } else {
      if (!this.users.length) {
        throw new NotFoundException(`No users found`);
      } else {
        return this.users;
      }
    }
  }

  findOne(userId: number): User {
    const user = this.users.find(user => userId === user.userId);

    if (!user) {
      throw new NotFoundException(`No user found with id ${userId}`);
    } else {
      return user;
    }
  }

  create(createUserDto: CreateUserDto): User {
    const usersByHighestId = [...this.users].sort((e1, e2) => e2.userId - e1.userId);
    const newUser = {
      userId: usersByHighestId[0].userId + 1,
      ...createUserDto
    };
    this.users.push(newUser);
    return newUser;
  }

  update(userId: number, updateUserDto: UpdateUserDto): User {
    this.users = this.users.map(user => {
      if (userId === user.userId) {
        return {
          ...user,
          ...updateUserDto
        };
      } else {
        return user;
      }
    });

    return this.findOne(userId);
  }

  removeAll(): User[] {
    if (!this.users.length) {
      throw new NotFoundException('No users found to delete');
    } else {
      const removedUsers = [...this.users];
      this.users = [];
      return removedUsers;
    }
  }

  remove(userId: number): User {
    const removedUser = this.findOne(userId);
    this.users = this.users.filter(user => userId !== user.userId);
    return removedUser;
  }
}
