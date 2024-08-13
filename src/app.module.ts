import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import { ChatsModule } from './features/chats/chats.module';
import { UserChatsModule } from './features/user-chats/user-chats.module';
import { MessagesModule } from './features/messages/messages.module';
import { CallsModule } from './features/calls/calls.module';

@Module({
  controllers: [],
  providers: [],
  imports: [UsersModule, ChatsModule, UserChatsModule, MessagesModule, CallsModule],
})
export class AppModule {}
