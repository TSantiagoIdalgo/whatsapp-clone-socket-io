import { HttpStatus, Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private user: Repository<User>,
    private jwt: JwtService) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.user.findOne({ where: { email: createUserDto.email }});
    if (user) throw new ConflictException(HttpStatus.CONFLICT, {
      cause: 'User already exist!'
    })

    const generatePasswordSalts = () => {
      const PASSWORD_SALTS = 20;
      let salts = Math.random() * PASSWORD_SALTS
      if (salts <= 10) salts = 10
      return Math.floor(salts)
    }
    const salts = await bcrypt.genSalt(generatePasswordSalts())
    const passwordhash = await bcrypt.hash(createUserDto.password, salts)

    const newUser = this.user.create(createUserDto);
    this.user.save({ ...newUser, password: passwordhash })

    // send verify email

    return newUser;
  }

  async findAll(options?: FindManyOptions<User>) {
    const users = await this.user.find(options);
    if (users.length === 0) throw new NotFoundException(HttpStatus.NOT_FOUND, {
      cause: 'There are no users with this query'
    })

    return users
  }

  async findOne(userId: string, query?: Record<string, string | boolean>) {
    const user = await this.user.findOne({ where: { email: userId, ...query } })
    if (!user) throw new NotFoundException(HttpStatus.NOT_FOUND, { 
      cause: 'User not exist or not found'
    })

    return user;
  }

  async userLogin(user: LoginUserDto) {
    const userFound = await this.findOne(user.email, { verify: true });

    const passwordVerify = await bcrypt.compare(user.password, userFound.email);

    if (!passwordVerify) throw new UnauthorizedException(HttpStatus.UNAUTHORIZED)
    const payload = { userId: userFound.email }
    
    return { 
      ...userFound, 
      access_token: `Bearer ${await this.jwt.signAsync(payload)}` 
    }
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(userId)
    const userUpdated = this.user.update({ email: user.email },  updateUserDto);
    return userUpdated;
  }

  async userVerify(token: string) {
    const user = this.jwt.verify(token)
    if (!user?.userId) throw new UnauthorizedException(HttpStatus.UNAUTHORIZED, {
      cause: 'Token invalid'
    });

    const userFound = await this.user.update({ email: user.userId }, { verify: true });
    if (!userFound) throw new NotFoundException(HttpStatus.NOT_FOUND, {
      cause: 'User not found with this userId'
    })

    return userFound;
  }
}
