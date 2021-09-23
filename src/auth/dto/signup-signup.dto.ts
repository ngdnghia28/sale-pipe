import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Time } from 'src/company-profiles/entities/company-profile.entity';
import { UserType } from 'src/users/entities/user.entity';

export class Id {
  @IsUUID()
  id: string;
}

export class SignupSignupDto {
  @IsString()
  code: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserType)
  type: UserType.SDR | UserType.HIRER;

  // user profile
  @IsUrl()
  @IsOptional()
  linkedIn?: string;

  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsUUID()
  @IsOptional()
  countryId?: string;

  @ValidateNested({ each: true })
  @Type(() => Id)
  @IsDefined()
  @IsOptional()
  languages?: Id[];

  @IsInt()
  @IsOptional()
  yose?: number;

  @ValidateNested({ each: true })
  @Type(() => Id)
  @IsDefined()
  @IsOptional()
  industries?: Id[];

  @IsString()
  @IsOptional()
  saleChannels?: string;

  @IsString()
  @IsOptional()
  saleSkills?: string;

  @IsString()
  @IsOptional()
  saleTools?: string;

  @IsString()
  @IsOptional()
  headline?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsNumberString()
  @IsOptional()
  rate?: string;

  @IsString()
  @IsOptional()
  workHistory?: string;

  @IsInt()
  @IsOptional()
  hoursPerWeek?: number;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  // company profile

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  title?: string;

  // linkedIn?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  // phone?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsEnum(Time)
  @IsOptional()
  time?: Time;

  @IsString()
  @IsOptional()
  headCount?: string;

  // saleTools?: string;

  @IsString()
  @IsOptional()
  targetCustomer?: string;

  @IsString()
  @IsOptional()
  teamSize?: string;

  // avatar?: string;

  // headline?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
