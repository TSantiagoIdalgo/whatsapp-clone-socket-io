import { Module } from '@nestjs/common';
import { UsersModule } from './components/users/users.module';
import { ChatModule } from './components/chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './config/db.config';
import { MessagesModule } from './components/messages/messages.module';
import { UsersChatModule } from './components/users-chat/users-chat.module';
import { UserSettingsModule } from './components/user-settings/user-settings.module';

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
    ChatModule, 
    MessagesModule, 
    UsersChatModule, 
    UserSettingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
