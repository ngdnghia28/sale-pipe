import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: string, updateUserProfileDto: UpdateUserProfileDto) {
    const userProfile = await this.findOne(id);
    if (userProfile) {
      return this.repo.save({ ...userProfile, ...updateUserProfileDto });
    } else {
      throw new NotFoundException(`User profile ${id} not found`)
    }
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
