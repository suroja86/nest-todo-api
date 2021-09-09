import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  create(userDto: User): Promise<User> {
    delete userDto.id;
    return this.userRepository.save(userDto);
  }

  async update(userDto: User): Promise<User> {
    return this.userRepository.save(userDto);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
  /*async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }*/
}
