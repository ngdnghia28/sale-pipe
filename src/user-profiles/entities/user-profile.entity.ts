import { Base } from "src/core/base.entity";
import { Country } from "src/countries/entities/country.entity";
import { Industry } from "src/industries/entities/industry.entity";
import { Language } from "src/languages/entities/language.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";

@Entity()
export class UserProfile extends Base {
  @Column({
    name: "user_id"
  })
  userId: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({
    nullable: true
  })
  linked_in?: string;

  @Column()
  rate: string;

  @Column()
  hours_per_week: number;

  @Column({
    nullable: true
  })
  avatar?: string;

  @Column()
  headline: string;

  @Column({
    length: 1023
  })
  bio: string;

  @Column({
    name: "country_id"
  })
  countryId: string;

  @OneToOne(() => Country)
  @JoinColumn()
  country: Country;

  @ManyToMany(() => Language)
  @JoinTable()
  languages: Language[];

  @Column()
  yose: number;

  @ManyToMany(() => Industry)
  @JoinTable()
  industries: Industry[];

  @Column({
    nullable: true
  })
  sale_channel?: string;

  @Column({
    nullable: true
  })
  sale_skill?: string;

  @Column({
    nullable: true,
    length: 1023
  })
  work_history?: string;

}
