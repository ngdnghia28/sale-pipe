import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserType } from 'src/users/user.entity';

export class SignUpDto {
  @IsEnum(UserType)
  type: UserType;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
