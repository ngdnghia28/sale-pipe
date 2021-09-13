import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class ForgotPasswordRequestDto {
  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsUUID()
  code: string;
}
