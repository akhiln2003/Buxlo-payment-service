import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SubscriptionPlan } from "../../../@types/enums/subscriptionPlanType";
import { PaymentStatus } from "../../../@types/enums/paymentStatus";

@Entity("subscriptionPayments")
export class SubscriptionPaymentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 24,
  })
  userId: string;

  @Column({ type: "decimal" })
  amount: number;

  @Column({
    type: "enum",
    enum: SubscriptionPlan,
  })
  type: SubscriptionPlan;

  @Column({
    type: "enum",
    enum: PaymentStatus,
  })
  status: PaymentStatus;

  @Column({
    type: "varchar",
  })
  subscriptionId: string;

  @Column({ unique: true })
  paymentId: string;

  @CreateDateColumn()
  transactionDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
