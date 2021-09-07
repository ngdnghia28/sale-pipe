import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsUUID, ValidateNested } from 'class-validator';
import { CreateContractTermDto } from 'src/contract-terms/dto/create-contract-term.dto';

export class Id {
  @IsUUID()
  id: string;
}

class CreateContractTermNestedDto extends OmitType(CreateContractTermDto, [
  'contract',
]) {}

export class CreateContractDto {
  @Type(() => Id)
  @IsDefined()
  hirer: Id;

  @Type(() => Id)
  @IsDefined()
  hiree: Id;

  @ValidateNested({ each: true })
  @Type(() => CreateContractTermNestedDto)
  @IsDefined()
  terms: CreateContractTermNestedDto[];

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
