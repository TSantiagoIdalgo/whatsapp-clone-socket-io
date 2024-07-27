import { Module } from '@nestjs/common';
import { UsersChatService } from './users-chat.service';
import { UsersChatController } from './users-chat.controller';

@Module({
  controllers: [UsersChatController],
  providers: [UsersChatService],
})
export class UsersChatModule {}
