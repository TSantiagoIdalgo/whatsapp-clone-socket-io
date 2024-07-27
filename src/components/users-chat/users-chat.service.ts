import { Injectable } from '@nestjs/common';
import { CreateUsersChatDto } from './dto/create-users-chat.dto';
import { UpdateUsersChatDto } from './dto/update-users-chat.dto';

@Injectable()
export class UsersChatService {
  create(createUsersChatDto: CreateUsersChatDto) {
    return 'This action adds a new usersChat';
  }

  findAll() {
    return `This action returns all usersChat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersChat`;
  }

  update(id: number, updateUsersChatDto: UpdateUsersChatDto) {
    return `This action updates a #${id} usersChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersChat`;
  }
}
