import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createMysqlQuery, FindQuery } from 'src/shared/paging';
import { Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractsService {
  constructor(@InjectRepository(Contract) private repo: Repository<Contract>) {}

  create(createContractDto: CreateContractDto) {
    return this.repo.save(this.repo.create(createContractDto));
  }

  findAll(query: FindQuery<{ hirerId: string }>) {
    return this.repo.find(createMysqlQuery(query));
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  async update(id: string, updateContractDto: UpdateContractDto) {
    return this.repo.update(id, updateContractDto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
