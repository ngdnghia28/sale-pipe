import { IsEmail, IsString } from 'class-validator';

export class SignupCheckCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}
