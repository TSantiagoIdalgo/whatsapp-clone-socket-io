import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersChatService } from './users-chat.service';
import { CreateUsersChatDto } from './dto/create-users-chat.dto';
import { UpdateUsersChatDto } from './dto/update-users-chat.dto';

@Controller('users-chat')
export class UsersChatController {
  constructor(private readonly usersChatService: UsersChatService) {}

  @Post()
  create(@Body() createUsersChatDto: CreateUsersChatDto) {
    return this.usersChatService.create(createUsersChatDto);
  }

  @Get()
  findAll() {
    return this.usersChatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersChatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersChatDto: UpdateUsersChatDto) {
    return this.usersChatService.update(+id, updateUsersChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersChatService.remove(+id);
  }
}
