import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';

@ApiTags('Auth')
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
