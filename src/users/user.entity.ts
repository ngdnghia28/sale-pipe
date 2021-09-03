import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/entities/role.entity';
import { Base } from 'src/core/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

export enum UserType {
  USER = 'USER',
  HIRER = 'HIRER',
  SYSTEM = 'SYSTEM',
}
@Entity('users')
export class User extends Base {
  @Column({
    type: 'enum',
    enum: UserType,
  })
  type: UserType;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(() => Role, {
    eager: true,
  })
  @JoinTable({
    name: 'users_roles',
  })
  roles: Role[];

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column({
    default: false,
    name: 'is_active',
  })
  isActive: boolean;
}
