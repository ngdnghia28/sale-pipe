import { HttpException } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createMysqlQuery, FindQuery } from 'src/shared/paging';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private repo: Repository<UserProfile>,
  ) { }

  // because of this: https://github.com/typeorm/typeorm/issues/2200
  // we need to use find instead
  async findByUserId(id: string) {
    const profiles = await this.repo.find({
      where: {
        userId: id,
      },
    });

    return profiles ? profiles[0] : null;
  }

  async create(createUserProfileDto: CreateUserProfileDto) {
    const profile = await this.findByUserId(createUserProfileDto.userId);

    if (profile) {
      throw new HttpException(
        `Profile already exist for ${createUserProfileDto.userId}`,
        400,
      );
    }

    return this.repo.save(createUserProfileDto);
  }

  findAll(query: FindQuery<Pick<UserProfile, 'isVerified' | 'isAvailable'>>) {
    return this.repo.find(createMysqlQuery(query));
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  async update(id: string, updateUserProfileDto: UpdateUserProfileDto) {
    const userProfile = await this.findOne(id);
    if (userProfile) {
      return this.repo.save({ ...userProfile, ...updateUserProfileDto });
    } else {
      throw new NotFoundException(`User profile ${id} not found`);
    }
  }

  async verifiedProfile(id: string) {
    const userProfile = await this.findOne(id);
    if (userProfile) {
      return this.repo.update(id, { isVerified: true });
    } else {
      throw new NotFoundException(`User profile ${id} not found`);
    }
  }

  async setAvailableByUser(userId: string, isAvailable: boolean) {
    const userProfile = await this.repo.findOne({
      where: {
        userId,
      },
    });
    if (userProfile) {
      return this.repo.update(userProfile.id, { isAvailable: isAvailable });
    } else {
      throw new NotFoundException(`User profile for user ${userId} not found`);
    }
  }

  async updateByUserId(
    userId: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ) {
    const userProfile = await this.findByUserId(userId);
    if (userProfile) {
      return this.repo.save({ ...userProfile, ...updateUserProfileDto });
    } else {
      throw new NotFoundException(`User profile for user ${userId} not found`);
    }
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
