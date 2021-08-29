import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { CompanyProfile } from './entities/company-profile.entity';

@Injectable()
export class CompanyProfilesService {
  constructor(
    @InjectRepository(CompanyProfile)
    private repo: Repository<CompanyProfile>) { }

  create(ccreateCompanyProfileDto: CreateCompanyProfileDto) {
    return this.repo.save(ccreateCompanyProfileDto)
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  async update(id: string, updateCompanyProfileDto: UpdateCompanyProfileDto) {
    return this.repo.update(id, updateCompanyProfileDto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
