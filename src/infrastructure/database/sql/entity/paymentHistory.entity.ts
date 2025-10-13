import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PaymentHistoryStatus } from "../../../@types/enums/PaymentHistoryStatus";
import { PaymentType } from "../../../@types/enums/PaymentType";

@Entity("paymentHistorys")
export class PaymentHistoryEntity {
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
    enum: PaymentType,
  })
  type: PaymentType;

  @Column({
    type: "enum",
    enum: PaymentHistoryStatus,
  })
  status: PaymentHistoryStatus;

  @Column()
  paymentId: string;

  @Column({
    type: "varchar",
    length: 24,
  })
  category: string;

  @CreateDateColumn()
  transactionDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
