import { Base } from 'src/core/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('countries')
export class Country extends Base {
  @Column({
    unique: true,
  })
  code: string;

  @Column()
  name: string;
}
