import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsInt,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class Id {
  @IsUUID()
  id: string;
}

export class CreateUserProfileDto {
  @IsUUID()
  userId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsUrl()
  @IsOptional()
  linkedIn?: string;

  @IsPhoneNumber()
  phone: string;

  @IsUUID()
  countryId: string;

  @ValidateNested({ each: true })
  @Type(() => Id)
  @IsDefined()
  languages: Id[];

  @IsInt()
  yose: number;

  @ValidateNested({ each: true })
  @Type(() => Id)
  @IsDefined()
  industries: Id[];

  @IsString()
  saleChannels?: string;

  @IsString()
  saleSkills?: string;

  @IsString()
  saleTools?: string;

  @IsString()
  headline: string;

  @IsString()
  bio: string;

  @IsNumberString()
  rate: string;

  @IsString()
  workHistory?: string;

  @IsInt()
  hoursPerWeek: number;

  @IsUrl()
  @IsOptional()
  avatar?: string;
}

export class CreateMyUserProfileDto extends OmitType(CreateUserProfileDto, [
  'userId',
]) {}
