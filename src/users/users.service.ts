import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

const HASH_ROUND = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: Partial<User>): Promise<User> {
    dto.password = await hash(dto.password, HASH_ROUND);
    return this.usersRepository.save(this.usersRepository.create(dto));
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneOrFail({
      email,
    });
  }

  async setActive(id: string): Promise<void> {
    await this.usersRepository.findOneOrFail(id);
    await this.usersRepository.update(id, { isActive: true });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.findOneOrFail(id);
    await this.usersRepository.delete(id);
  }
}
