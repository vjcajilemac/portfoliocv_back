import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}
  @Post()
  createUser(@Body() newUser: CreateUserDTO) {
    return this.usersServices.createUser(newUser);
  }
}
