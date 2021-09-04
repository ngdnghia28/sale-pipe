import { IsString } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  code: string;

  @IsString()
  name: string;
}
