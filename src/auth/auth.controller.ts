import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) { }

  @Get('users')
  getUsers() {
    return this.usersService.findAll();
  }

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.usersService.create(dto);
  }
}
