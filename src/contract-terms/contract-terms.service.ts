import { Injectable } from '@nestjs/common';
import { CreateContractTermDto } from './dto/create-contract-term.dto';
import { UpdateContractTermDto } from './dto/update-contract-term.dto';

@Injectable()
export class ContractTermsService {
  create(createContractTermDto: CreateContractTermDto) {
    return 'This action adds a new contractTerm';
  }

  findAll() {
    return `This action returns all contractTerms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contractTerm`;
  }

  update(id: number, updateContractTermDto: UpdateContractTermDto) {
    return `This action updates a #${id} contractTerm`;
  }

  remove(id: number) {
    return `This action removes a #${id} contractTerm`;
  }
}
