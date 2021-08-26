import { Base } from 'src/core/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class User extends Base {
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

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
