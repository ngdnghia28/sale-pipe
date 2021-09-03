import { Base } from 'src/core/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('countries')
export class Country extends Base {
  @Column()
  code: string;

  @Column()
  name: string;
}
