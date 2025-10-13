import { PaymentHistoryStatus } from "../../infrastructure/@types/enums/PaymentHistoryStatus";
import { PaymentType } from "../../infrastructure/@types/enums/PaymentType";

export class PaymentHistory {
  constructor(
    public amount: number,
    public userId: string,
    public category: string,
    public status: PaymentHistoryStatus,
    public paymentId: string,
    public type: PaymentType,
    public id?: string,
    public transactionDate?: Date,
    public updatedAt?: Date
  ) {}
}
