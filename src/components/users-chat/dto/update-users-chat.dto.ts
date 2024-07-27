import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersChatDto } from './create-users-chat.dto';

export class UpdateUsersChatDto extends PartialType(CreateUsersChatDto) {}
