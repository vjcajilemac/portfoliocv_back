import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserProfileDTO } from './dto/create-user-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersServices.getUsers();
  }
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.getUser(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDTO) {
    return this.usersServices.createUser(newUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.deleteUser(id);
  }
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDTO,
  ) {
    return this.usersServices.updateUser(id, user);
  }
  //Profile
  @Post(':id/profile')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateUserProfileDTO,
  ) {
    return this.usersServices.createProfile(id, profile);
  }
}
