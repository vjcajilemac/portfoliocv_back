import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserProfileDTO } from './dto/create-user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly userProfileRepository: Repository<Profile>,
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
  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
  async createProfile(id: number, profile: CreateUserProfileDTO) {
    try {
      const userFound = await this.userRepository.findOne({ where: { id } });
      if (!userFound)
        return new HttpException('userNotFound', HttpStatus.NOT_FOUND);

      if (!!!userFound.profile)
        throw new HttpException(
          'This user already have a profile',
          HttpStatus.CONFLICT,
        );

      const newProfile = this.userProfileRepository.create(profile);

      const savedProfile = await this.userProfileRepository.save(newProfile);
      userFound.profile = savedProfile;
      return this.userRepository.save(userFound);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
