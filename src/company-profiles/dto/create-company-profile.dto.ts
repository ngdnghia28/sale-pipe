import { OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { Time } from '../entities/company-profile.entity';

export class CreateCompanyProfileDto {
  @IsUUID()
  userId: string;

  @IsString()
  company: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  title: string;

  @IsUrl()
  @IsOptional()
  linkedIn?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsEnum(Time)
  @IsOptional()
  time?: Time;

  @IsString()
  @IsOptional()
  headCount?: string;

  @IsString()
  @IsOptional()
  saleTools?: string;

  @IsString()
  @IsOptional()
  targetCustomer?: string;

  @IsString()
  @IsOptional()
  teamSize?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  headline?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateMyCompanyProfileDto extends OmitType(
  CreateCompanyProfileDto,
  ['userId'],
) {}
