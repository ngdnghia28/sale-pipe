import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private repo: Repository<Country>) { }

  create(createCountryDto: CreateCountryDto) {
    return this.repo.create(createCountryDto)
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return this.repo.update(id, updateCountryDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
