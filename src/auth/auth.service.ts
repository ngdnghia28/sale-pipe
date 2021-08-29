import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(JwtService) private jwtService: JwtService
  ) { }

  signup(dto: SignUpDto) {
    return this.usersService.create(dto);
  }


  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    const isCorrect = await compare(dto.password, user.password);
    return isCorrect ? user : null;
  }

  async sign(user: any) {
    const payload = { email: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
