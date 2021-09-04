import { Module } from '@nestjs/common';
import { ContractTermsService } from './contract-terms.service';
import { ContractTermsController } from './contract-terms.controller';

@Module({
  controllers: [ContractTermsController],
  providers: [ContractTermsService]
})
export class ContractTermsModule {}
