import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { Actions, Resources } from 'src/shared/constant';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { ChangePasswordRequestDto } from './dto/change-password-request.dto';
import { ForgotPasswordRequestDto } from './dto/forgot-password-request.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { SignupCheckCodeDto } from './dto/signup-check-code.dto';
import { SignupPrepareDto as SignupEmailPrepareDto } from './dto/signup-prepare.dto';
import { SignupSignupDto } from './dto/signup-signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(AuthService) private readonly authService: AuthService,
  ) { }

  @Public()
  @Post('signup/email-prepare')
  signupEmailPrepare(@Body() dto: SignupEmailPrepareDto) {
    return this.authService.signupEmailPrepare(dto);
  }

  @Public()
  @Post('signup/email-check')
  signupEmailCheck(@Body() dto: SignupCheckCodeDto) {
    return this.authService.check(dto);
  }

  @Public()
  @Post('signup/email-confirm')
  signupEmailConfirm(@Body() dto: SignupSignupDto) {
    return this.authService.signupEmailConfirm(dto);
  }

  @Public()
  @Post('forgot-password-request')
  forgotPasswordRequest(@Body() dto: ForgotPasswordRequestDto) {
    return this.authService.forgotPasswordRequest(dto.email);
  }

  @Public()
  @Post('forgot-password-change')
  forgotPasswordChange(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPasswordChange(dto);
  }

  @UseRoles({
    resource: Resources.AUTH,
    action: Actions.UPDATE,
    possession: 'own',
  })
  @Post('change-password')
  async changePassword(
    @Body() dto: ChangePasswordRequestDto,
    @CurrentUser() user: User,
  ) {
    await this.authService.changePassword({
      ...dto,
      email: user.email,
    });
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto, @Request() req) {
    return this.authService.sign(req.user);
  }

  @UseRoles({
    resource: Resources.AUTH,
    action: Actions.READ,
    possession: 'own',
  })
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
