import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) { }

  signup(dto: SignUpDto) {
    return this.usersService.create(dto);
  }
}
