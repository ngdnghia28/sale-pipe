import { Base } from 'src/core/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('company_profiles')
export class CompanyProfile extends Base {
  @Column({
    name: 'user_id',
  })
  userId: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  linkedIn?: string;

  @Column({
    nullable: true,
  })
  avatar?: string;

  @Column()
  headline: string;

  @Column({
    length: 1023,
  })
  description: string;

  @Column({
    nullable: true,
  })
  website?: string;
}
