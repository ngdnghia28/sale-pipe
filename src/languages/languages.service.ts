import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private repo: Repository<Language>,
  ) { }

  create(createLanguageDto: CreateLanguageDto) {
    return this.repo.save(this.repo.create(createLanguageDto));
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  async update(id: string, updateLanguageDto: UpdateLanguageDto) {
    const result = await this.repo.update(id, updateLanguageDto);
    if (!result || !result.affected) {
      throw new EntityNotFoundError(Language, id);
    }
  }

  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (!result || !result.affected) {
      throw new EntityNotFoundError(Language, id);
    }
  }
}
