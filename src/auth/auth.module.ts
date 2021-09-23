import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignupToken } from './entities/signup-token.entity';
import { SignupTokenService } from './signup-token.service';
import { ForgotPasswordToken } from './entities/forgot-password-token.entity';
import { ForgotPasswordTokenService } from './forgot-password-token.service';
import { SignupPrepareToken } from './entities/signup-prepare-token.entity';
import { SignupPrepareTokenService } from './signup-prepare-token.service';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { CompanyProfilesModule } from 'src/company-profiles/company-profiles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SignupPrepareToken,
      SignupToken,
      ForgotPasswordToken,
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get('auth');
      },
      inject: [ConfigService],
    }),
    UsersModule,
    EmailModule,
    UserProfilesModule,
    CompanyProfilesModule,
  ],
  providers: [
    AuthService,
    SignupPrepareTokenService,
    SignupTokenService,
    ForgotPasswordTokenService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
