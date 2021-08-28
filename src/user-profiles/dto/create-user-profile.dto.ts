import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsInt, IsNumberString, IsOptional, IsPhoneNumber, IsString, IsUrl, IsUUID, ValidateNested } from "class-validator";

export class Id {
  @IsUUID()
  id: string;
}

export class CreateUserProfileDto {
  @IsUUID()
  userId: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  rate: string;

  @IsInt()
  hours_per_week: number;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsString()
  headline: string;

  @IsString()
  bio: string;

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
}
