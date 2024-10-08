import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class LoginUserDto implements Partial<User> {
    @ApiProperty({ description: 'The user`s email address that will be used as userId' })
    @IsString()
    @IsEmail()
      email: string;
      
    @ApiProperty({ description: 'The password hashed of the user'})
    @MinLength(8)
    @IsString()
      password: string;

    @ApiProperty({ description: 'Property that verifies if the user is correctly registered' })
      verify?: boolean;
}
