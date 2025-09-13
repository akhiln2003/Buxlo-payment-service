import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PaymentStatus } from "../../../@types/enums/paymentStatus";

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
    enum: PaymentStatus,
  })
  status: PaymentStatus;

  @Column({ unique: true  })
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
