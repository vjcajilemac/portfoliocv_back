import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
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
  getUsers() {
    return this.userRepository.find();
  }
  getUser(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  deleteUser(id: number) {
    //Se puede recibir por parametro
    return this.userRepository.delete({ id });
  }
  updateUser(id: number, user: UpdateUserDTO) {
    return this.userRepository.update({ id }, user);
  }
}
