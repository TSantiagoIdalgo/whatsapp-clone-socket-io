import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UsersModule, ChatModule, ChatGateway],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
