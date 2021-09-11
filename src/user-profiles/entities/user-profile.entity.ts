import { Expose } from 'class-transformer';
import { Base } from 'src/core/base.entity';
import { Country } from 'src/countries/entities/country.entity';
import { Industry } from 'src/industries/entities/industry.entity';
import { Language } from 'src/languages/entities/language.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity('user_profiles')
export class UserProfile extends Base {
  @Column()
  userId: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @Column({
    default: true,
  })
  isAvailable: boolean;

  @Expose({
    groups: ['owner'],
  })
  @Column()
  phone: string;

  @Expose({
    groups: ['owner'],
  })
  @Column()
  email: string;

  @Expose({
    groups: ['owner'],
  })
  @Column({
    nullable: true,
  })
  linkedIn?: string;

  @Expose({
    groups: ['owner'],
  })
  @Column()
  rate: string;

  @Expose({
    groups: ['owner'],
  })
  @Column()
  hoursPerWeek: number;

  @Column({
    nullable: true,
  })
  avatar?: string;

  @Column()
  headline: string;

  @Column({
    length: 1023,
  })
  bio: string;

  @Column()
  countryId: string;

  @ManyToOne(() => Country, {
    eager: true,
  })
  @JoinColumn({
    name: 'country_id',
  })
  country: Country;

  @ManyToMany(() => Language, {
    eager: true,
  })
  @JoinTable({
    name: 'user_profiles_languages',
    joinColumn: {
      name: 'user_profile_id',
    },
    inverseJoinColumn: {
      name: 'languagesId',
    },
  })
  languages: Language[];

  @Column()
  yose: number;

  @ManyToMany(() => Industry, {
    eager: true,
  })
  @JoinTable({
    name: 'user_profiles_industries',
    joinColumn: {
      name: 'user_profile_id',
    },
    inverseJoinColumn: {
      name: 'industriesId',
    },
  })
  industries: Industry[];

  @Column({
    nullable: true,
  })
  saleChannel?: string;

  @Column({
    nullable: true,
  })
  saleSkill?: string;

  @Column({
    nullable: true,
    length: 1023,
  })
  workHistory?: string;
}
