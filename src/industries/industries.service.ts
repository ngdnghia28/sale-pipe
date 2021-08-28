import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { Industry } from './entities/industry.entity';

@Injectable()
export class IndustriesService {
  constructor(
    @InjectRepository(Industry)
    private repo: Repository<Industry>) { }

  create(createIndustryDto: CreateIndustryDto) {
    return this.repo.create(createIndustryDto)
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateIndustryDto: UpdateIndustryDto) {
    return this.repo.update(id, updateIndustryDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
