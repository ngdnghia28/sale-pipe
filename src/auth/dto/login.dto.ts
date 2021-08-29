import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";
import { UserType } from "src/users/user.entity";

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}