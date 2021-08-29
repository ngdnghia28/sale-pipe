import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hash } from 'bcrypt';

const HASH_ROUND = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(dto: Partial<User>): Promise<User> {
    dto.password = await hash(dto.password, HASH_ROUND);
    return this.usersRepository.save(dto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneOrFail({
      email
    });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
