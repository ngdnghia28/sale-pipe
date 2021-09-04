import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private repo: Repository<Country>,
  ) { }

  create(createCountryDto: CreateCountryDto) {
    return this.repo.save(this.repo.create(createCountryDto));
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    const result = await this.repo.update(id, updateCountryDto);
    if (!result || !result.affected) {
      throw new EntityNotFoundError(Country, id);
    }
  }

  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (!result || !result.affected) {
      throw new EntityNotFoundError(Country, id);
    }
  }
}
