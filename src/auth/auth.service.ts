import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserType } from 'src/users/entities/user.entity';
import { EmailAuthService } from 'src/email/email-auth.service';
import { SignupTokenService } from './signup-token.service';
import { ForgotPasswordTokenService } from './forgot-password-token.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(SignupTokenService) private signupTokenService: SignupTokenService,
    @Inject(ForgotPasswordTokenService)
    private forgotPasswordTokenService: ForgotPasswordTokenService,
    @Inject(EmailAuthService) private emailAuthService: EmailAuthService,
  ) { }

  async signup(dto: SignUpDto) {
    const user: any = { ...dto };
    switch (dto.type) {
      case UserType.SDR:
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

    const result = await this.usersService.create(user);
    const token = await this.signupTokenService.create(result.id);
    await this.emailAuthService.createdAccount({
      email: dto.email,
      code: token.code,
    });
    return result;
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

  async verify(code: string) {
    return this.signupTokenService.verify(code);
  }

  async forgotPasswordRequest(email: string) {
    const user = await this.usersService.findByEmail(email);
    const token = await this.forgotPasswordTokenService.create(user.id);
    await this.emailAuthService.forgotPasswordRequest({
      email,
      code: token.code,
    });
  }

  async forgotPasswordChange(dto: ForgotPasswordDto) {
    return this.forgotPasswordTokenService.changePassword(dto);
  }
}
