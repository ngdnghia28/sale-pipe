import { OmitType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateCompanyProfileDto {
  @IsUUID()
  userId: string;

  @IsEmail()
  email: string;

  @IsUrl()
  @IsOptional()
  linked_in?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsString()
  headline: string;

  @IsString()
  description: string;

  @IsUrl()
  @IsOptional()
  website?: string;
}

export class CreateMyCompanyProfileDto extends OmitType(
  CreateCompanyProfileDto,
  ['userId'],
) {}
