import { HttpException, Injectable } from '@nestjs/common';
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

  async create(createCompanyProfileDto: CreateCompanyProfileDto) {
    const profile = await this.findByUserId(createCompanyProfileDto.userId);
    if (profile) {
      throw new HttpException(`Profile already exist for ${createCompanyProfileDto.userId}`, 400)
    } else {
      return this.repo.save(createCompanyProfileDto)
    }
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  async findByUserId(userId: string) {
    const profiles = await this.repo.find({
      where: {
        userId
      }
    });

    return profiles ? profiles[0] : null;
  }

  async update(id: string, updateCompanyProfileDto: UpdateCompanyProfileDto) {
    return this.repo.update(id, updateCompanyProfileDto);
  }

  async updateByUserId(userId: string, updateCompanyProfileDto: UpdateCompanyProfileDto) {
    const profile = await this.findByUserId(userId);
    if (profile) {
      return this.repo.update(profile.id, updateCompanyProfileDto);
    } else {
      throw new HttpException(`Profile not fount for ${userId}`, 400);
    }
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
