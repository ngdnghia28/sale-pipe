import { Base } from 'src/core/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('languages')
export class Language extends Base {
  @Column({
    unique: true,
  })
  code: string;

  @Column()
  name: string;
}
