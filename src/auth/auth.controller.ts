import { Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }
}
