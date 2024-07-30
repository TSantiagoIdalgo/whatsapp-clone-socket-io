import { UserSetting } from "src/components/user-setting/entities/user-setting.entity";
import { User } from "../entities/user.entity";
import { IsEmail, IsString, MinLength } from "class-validator";

type UserDTO = Omit<User, 'chats'>

export class CreateUserDto implements Omit<UserDTO, 'messages'> {
  @IsString()
  @MinLength(3)
    userName: string;
  @IsString()
  @IsEmail()
    email: string;  
  
  @IsString()
  @MinLength(8)
    password: string;
  settings: UserSetting;
}
