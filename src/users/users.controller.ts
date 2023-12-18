import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersServices.getUsers();
  }
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersServices.getUser(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDTO): Promise<User> {
    return this.usersServices.createUser(newUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.deleteUser(id);
  }
}
