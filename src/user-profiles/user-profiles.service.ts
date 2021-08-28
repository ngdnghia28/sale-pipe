import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private repo: Repository<UserProfile>) { }

  create(createUserProfileDto: CreateUserProfileDto) {
    return this.repo.save(createUserProfileDto)
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  update(id: string, updateUserProfileDto: UpdateUserProfileDto) {
    return this.repo.update(id, updateUserProfileDto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
