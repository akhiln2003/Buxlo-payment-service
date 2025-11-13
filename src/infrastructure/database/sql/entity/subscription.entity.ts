import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("subscriptions")
export class SubscriptionEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("decimal")
  price: number;

  @Column("decimal")
  offer: number;

  @Column()
  type: string;

  @Column("int")
  duration: number;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
