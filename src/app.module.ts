import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import { ChatsModule } from './features/chats/chats.module';
import { UserChatsModule } from './features/user-chats/user-chats.module';
import { MessagesModule } from './features/messages/messages.module';
import { CallsModule } from './features/calls/calls.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './config/db.config';
import { UserSettingsModule } from './features/user-settings/user-settings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: 5432,
      username: DB_USER,
      database: DB_NAME,
      password: DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    UsersModule, 
    ChatsModule, 
    UserChatsModule, 
    MessagesModule, 
    CallsModule, 
    UserSettingsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
