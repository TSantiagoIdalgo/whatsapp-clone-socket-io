import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.user.create(createUserDto);
    await this.user.save(newUser);
    return newUser;
  }

  async findAll() {
    const users = await this.user.find({ relations: ['chats'] });
    if (users.length === 0) throw new NotFoundException(HttpStatus.NOT_FOUND);

    return users;
  }

  async findOne(userId: string) {
    const user = await this.user.findBy({ email: userId });
    if (!user) throw new NotFoundException(HttpStatus.NOT_FOUND);

    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    const userFound = await this.findOne(updateUserDto.email);
    if (!userFound) throw new NotFoundException(HttpStatus.NOT_FOUND);
    const user = await this.user.update(updateUserDto.email, updateUserDto)

    return user
  }

}
