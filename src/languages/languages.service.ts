import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private repo: Repository<Language>,
  ) {}

  create(createLanguageDto: CreateLanguageDto) {
    return this.repo.create(createLanguageDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  update(id: string, updateLanguageDto: UpdateLanguageDto) {
    return this.repo.update(id, updateLanguageDto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
