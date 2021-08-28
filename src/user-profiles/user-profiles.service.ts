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
    return this.repo.create(createUserProfileDto)
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    return this.repo.update(id, updateUserProfileDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
