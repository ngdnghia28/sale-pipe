import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserType } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(JwtService) private jwtService: JwtService,
  ) { }

  signup(dto: SignUpDto) {
    const user: any = { ...dto };
    switch (dto.type) {
      case UserType.USER:
        user.roles = [
          {
            id: '90df268d-0947-11ec-9b25-0242ac140002',
          },
        ];
        break;
      case UserType.HIRER:
        user.roles = [
          {
            id: '0378cee7-0948-11ec-9b25-0242ac140002',
          },
        ];
        break;
    }
    return this.usersService.create(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    const isCorrect = await compare(dto.password, user.password);
    return isCorrect ? user : null;
  }

  async sign(user: User) {
    const payload = {
      email: user.username,
      sub: user.id,
      roles: (user?.roles || []).map((r) => r.code),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
