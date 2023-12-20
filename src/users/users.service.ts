import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
  async createUser(user: CreateUserDTO) {
    const userFound = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (userFound)
      return new HttpException('User already exist', HttpStatus.CONFLICT);
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
  getUsers() {
    return this.userRepository.find();
  }
  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({ where: { id } });
    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    else return userFound;
  }
  async deleteUser(id: number) {
    //Se puede recibir por parametro
    const userDeleted = await this.userRepository.delete({ id });
    if (userDeleted.affected === 0)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    return userDeleted;
  }
  async updateUser(id: number, user: UpdateUserDTO) {
    const userFound = await this.userRepository.findOne({ where: { id } });
    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    // first option
    //return this.userRepository.update({ id }, user);
    //Second option
    const userUpdated = Object.assign(userFound, user);
    return this.userRepository.save(userUpdated);
  }
}
