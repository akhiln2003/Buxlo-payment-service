import { PaymentStatus } from "../../infrastructure/@types/enums/paymentStatus";
import { SubscriptionPlan } from "../../infrastructure/@types/enums/subscriptionPlanType";

export class SubscriptionPayment {
  constructor(
    public amount: number,
    public userId: string,
    public type: SubscriptionPlan,
    public status: PaymentStatus,
    public paymentId: string,
    public subscriptionId: string,
    public id?: string,
    public transactionDate?: Date,
    public updatedAt?: Date
  ) {}
}
