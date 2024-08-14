import { Controller, Get, Post, Body, Patch, Param, Query, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user after validation' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Should return all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Should return a user with his email', parameters: [{ in: 'path', name: 'userId' }] })
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Patch('userId')
  @ApiOperation({ summary: 'Make a partial update of a user', parameters: [{ in: 'path', name: 'userId' }] })
  update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Returns a user and a validation token' })
  async userLogin(@Res() res: Response, @Body() userLoginDto: LoginUserDto) {
    const user = await this.usersService.userLogin(userLoginDto)
    res.cookie('access_token', user.access_token)
    delete user.access_token
    
    return user;
  }

  @Get('verify')
  @ApiOperation({ summary: 'Authenticates the user given a token', parameters: [{ in: 'query', name: 'access_token' }]})
  userVerify(@Query('access_token') token: string) {
    return this.usersService.userVerify(token)
  }
}
