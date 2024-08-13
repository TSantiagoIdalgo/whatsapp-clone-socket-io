import { Module } from '@nestjs/common';
import { UserChatsService } from './user-chats.service';
import { UserChatsController } from './user-chats.controller';

@Module({
  controllers: [UserChatsController],
  providers: [UserChatsService],
})
export class UserChatsModule {}
