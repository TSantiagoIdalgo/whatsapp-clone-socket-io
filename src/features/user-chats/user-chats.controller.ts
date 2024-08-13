import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserChatsService } from './user-chats.service';
import { CreateUserChatDto } from './dto/create-user-chat.dto';
import { UpdateUserChatDto } from './dto/update-user-chat.dto';

@Controller('user-chats')
export class UserChatsController {
  constructor(private readonly userChatsService: UserChatsService) {}

  @Post()
  create(@Body() createUserChatDto: CreateUserChatDto) {
    return this.userChatsService.create(createUserChatDto);
  }

  @Get()
  findAll() {
    return this.userChatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userChatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserChatDto: UpdateUserChatDto) {
    return this.userChatsService.update(+id, updateUserChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userChatsService.remove(+id);
  }
}
