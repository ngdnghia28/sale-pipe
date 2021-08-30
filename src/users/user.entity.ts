import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/entities/role.entity';
import { Base } from 'src/core/base.entity';
import { Roles } from 'src/shared/constant';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

export enum UserType {
  USER = 'USER',
  HIRER = 'HIRER',
}
@Entity('users')
export class User extends Base {
  @Column({
    type: 'enum',
    enum: UserType
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
    eager: true
  })
  @JoinTable({
    name: "users_roles"
  })
  roles: Role[];

  @Column({
    name: "first_name"
  })
  firstName: string;

  @Column({
    name: "last_name"
  })
  lastName: string;

  @Column({
    default: true,
    name: "is_active"
  })
  isActive: boolean;
}
