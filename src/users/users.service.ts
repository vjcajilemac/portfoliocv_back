import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  createUser(user: CreateUserDTO) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
