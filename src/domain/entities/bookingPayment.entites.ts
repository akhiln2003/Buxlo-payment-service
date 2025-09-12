import { PaymentStatus } from "../../infrastructure/@types/enums/paymentStatus";

export class Payment {
  constructor(
    public amount: number,
    public mentorId: string,
    public userId: string,
    public slotId: string, 
    public status: PaymentStatus,
    public paymentId: string,
    public id?: string,
    public transactionDate?: Date,
    public updatedAt?: Date,
  ) {}
}
