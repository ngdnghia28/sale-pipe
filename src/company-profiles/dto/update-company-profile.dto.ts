import { PartialType } from '@nestjs/swagger';
import { CreateCompanyProfileDto } from './create-company-profile.dto';

export class UpdateCompanyProfileDto extends PartialType(CreateCompanyProfileDto) {}
