import { Base } from "src/core/base.entity";
import { Column, Entity } from "typeorm";

@Entity('roles')
export class Role extends Base {
  @Column()
  code: string;

  @Column()
  name: string;
}
