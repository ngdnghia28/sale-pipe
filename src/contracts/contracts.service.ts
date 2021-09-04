import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractsService {
  create(createContractDto: CreateContractDto) {
    return 'This action adds a new contract';
  }

  findAll() {
    return `This action returns all contracts`;
  }

  findOne(id: string) {
    return `This action returns a #${id} contract`;
  }

  update(id: string, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`;
  }

  remove(id: string) {
    return `This action removes a #${id} contract`;
  }
}
