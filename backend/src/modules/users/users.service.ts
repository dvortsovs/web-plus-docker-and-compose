import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async getUserByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async findMany({ query }: SearchUserDto) {
    return await this.userRepository.find({
      where: [{ email: query }, { username: query }],
    });
  }

  async remove(id: number) {
    return await this.userRepository.delete({ id });
  }

  async update(id: number, userDto: CreateUserDto) {
    return await this.userRepository.update(
      { id },
      { ...userDto, updatedAt: new Date() },
    );
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({
        ...createUserDto,
        password: hash,
      });
      return await this.userRepository.save(user);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
