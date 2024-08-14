import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { API_SECRET } from 'src/config/utility.config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: API_SECRET,
      signOptions: { expiresIn: '7d' }
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
