import { Base } from "src/core/base.entity";
import { Country } from "src/countries/entities/country.entity";
import { Industry } from "src/industries/entities/industry.entity";
import { Language } from "src/languages/entities/language.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";

@Entity('company_profiles')
export class CompanyProfile extends Base {
  @Column({
    name: "user_id"
  })
  userId: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  email: string;

  @Column({
    nullable: true
  })
  linked_in?: string;

  @Column({
    nullable: true
  })
  avatar?: string;

  @Column()
  headline: string;

  @Column({
    length: 1023
  })
  description: string;

  @Column({
    nullable: true
  })
  website?: string;

}
