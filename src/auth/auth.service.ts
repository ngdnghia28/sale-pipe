import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, compareSync } from 'bcrypt';
import { CompanyProfilesService } from 'src/company-profiles/company-profiles.service';
import { CreateCompanyProfileDto } from 'src/company-profiles/dto/create-company-profile.dto';
import { CompanyProfile } from 'src/company-profiles/entities/company-profile.entity';
import { EmailAuthService } from 'src/email/email-auth.service';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { User, UserType } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { SignupCheckCodeDto } from './dto/signup-check-code.dto';
import { SignupPrepareDto } from './dto/signup-prepare.dto';
import { SignupSignupDto } from './dto/signup-signup.dto';
import { ForgotPasswordTokenService } from './forgot-password-token.service';
import { SignupPrepareTokenService } from './signup-prepare-token.service';
import { SignupTokenService } from './signup-token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(SignupTokenService) private signupTokenService: SignupTokenService,
    @Inject(SignupPrepareTokenService)
    private signupPrepareTokenService: SignupPrepareTokenService,
    @Inject(ForgotPasswordTokenService)
    private forgotPasswordTokenService: ForgotPasswordTokenService,
    @Inject(EmailAuthService) private emailAuthService: EmailAuthService,
    @Inject(UserProfilesService) private userProfilesService: UserProfilesService,
    @Inject(CompanyProfilesService) private companyProfilesService: CompanyProfilesService,
  ) { }

  async signupEmailPrepare(dto: SignupPrepareDto) {
    const token = await this.signupPrepareTokenService.create(dto.email);
    await this.emailAuthService.signupEmailPrepare({
      email: dto.email,
      code: token.code,
    });
  }

  async check(dto: SignupCheckCodeDto) {
    const token = await this.signupPrepareTokenService.findByEmail(dto.email);
    if (!token || token.code !== dto.code) {
      throw new HttpException('Code is not correct or expired', 400);
    }
  }

  async signupEmailConfirm(dto: SignupSignupDto) {
    const token = await this.signupPrepareTokenService.findByEmail(dto.email);

    if (!token || token.code !== dto.code) {
      throw new NotFoundException('Signup token not found');
    } else if (token.expiryDate < new Date()) {
      throw new BadRequestException('Signup token expired');
    }

    this.signupPrepareTokenService.delete(token.id);

    // create user
    const userDto = {
      password: dto.password,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      type: dto.type,
      isActive: true,
      username: `u_${Math.random() * 2 ** 64}`,
    } as User;
    switch (dto.type) {
      case UserType.SDR:
        userDto.roles = [
          {
            id: '90df268d-0947-11ec-9b25-0242ac140002',
          },
        ] as any;
        break;
      case UserType.HIRER:
        userDto.roles = [
          {
            id: '0378cee7-0948-11ec-9b25-0242ac140002',
          },
        ] as any;
        break;
    }

    await this.emailAuthService.signupEmailConfirm({
      email: dto.email,
    });

    const user = await this.usersService.create(userDto);

    // create profile
    let profile;
    if (dto.type === UserType.SDR) {
      profile = {
        userId: user.id,
        isAvailable: true,
        isVerified: false,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        linkedIn: dto.linkedIn,
        phone: dto.phone,
        countryId: dto.countryId,
        languages: dto.languages,
        yose: dto.yose,
        industries: dto.industries,
        saleChannels: dto.saleChannels,
        saleSkills: dto.saleSkills,
        saleTools: dto.saleTools,
        headline: dto.headline,
        bio: dto.bio,
        rate: dto.rate,
        workHistory: dto.workHistory,
        hoursPerWeek: dto.hoursPerWeek,
        avatar: dto.avatar,
      } as UserProfile;
      return this.userProfilesService.create(profile);
    } else if (dto.type === UserType.HIRER) {
      profile = {
        userId: user.id,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        company: dto.company,
        title: dto.title,
        linkedIn: dto.linkedIn,
        website: dto.website,
        phone: dto.phone,
        position: dto.position,
        time: dto.time,
        headCount: dto.headCount,
        saleTools: dto.saleTools,
        targetCustomer: dto.targetCustomer,
        teamSize: dto.teamSize,
        avatar: dto.avatar,
        headline: dto.headline,
        description: dto.description,
      } as CompanyProfile;

      return this.companyProfilesService.create(profile);
    }
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    const isCorrect = await compare(dto.password, user.password);
    return isCorrect ? user : null;
  }

  async sign(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      roles: (user?.roles || []).map((r) => r.code),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
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
    await this.forgotPasswordTokenService.changePassword(dto);
    return this.emailAuthService.changedPassword({
      email: dto.email,
    });
  }

  async changePassword(dto: ChangePasswordDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!compareSync(dto.oldPassword, user.password)) {
      throw new NotFoundException('User not found');
    } else {
      await this.usersService.updatePassword(user.id, dto.password);
      return this.emailAuthService.changedPassword({
        email: dto.email,
      });
    }
  }
}
