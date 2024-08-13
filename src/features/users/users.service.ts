import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm'

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private user: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.user.create(createUserDto);
    this.user.save(newUser)
    return newUser;
  }

  async findAll(options?: FindManyOptions<User>) {
    const users = await this.user.find(options);
    if (users.length === 0) throw new NotFoundException(HttpStatus.NOT_FOUND, {
      cause: 'There are no users with this query'
    })

    return users
  }

  async findOne(userId: string) {
    const user = await this.user.findOne({ where: { email: userId } })
    if (!user) throw new NotFoundException(HttpStatus.NOT_FOUND, { 
      cause: 'User not exist or not found'
    })

    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(userId)
    const userUpdated = this.user.update({ email: user.email },  updateUserDto);
    return userUpdated;
  }
}
