import { ContractTerm } from 'src/contract-terms/entities/contract-term.entity';
import { Base } from 'src/core/base.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

export enum ContractStatus {
  DRAFT = 'DRAFT',
  FINAL = 'FINAL',
  EFFECTING = 'EFFECTING',
  ENDED = 'ENDED',
}
@Entity()
export class Contract extends Base {
  @ManyToOne(() => User)
  hirer: User;

  @ManyToOne(() => User)
  hiree: User;

  @OneToMany(() => ContractTerm, (term) => term.contract, {
    eager: true,
  })
  terms: ContractTerm[];

  @Column({
    type: 'enum',
    enum: ContractStatus,
  })
  status: ContractStatus;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
