import { IsString } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  code: string;

  @IsString()
  name: string;
}
