import { PaymentStatus } from "../../infrastructure/@types/enums/paymentStatus";

export class PaymentHistory {
  constructor(
    public amount: number,
    public userId: string,
    public category: string,
    public status: PaymentStatus,
    public paymentId: string,
    public id?: string,
    public transactionDate?: Date,
    public updatedAt?: Date
  ) {}
}
