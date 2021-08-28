import { Base } from 'src/core/base.entity';
import { Entity, Column } from 'typeorm';

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
  password: string;

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
