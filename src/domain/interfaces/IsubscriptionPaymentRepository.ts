import { SubscriptionPayment } from "../entities/subscriptionPayment.entity";

export interface IsubscriptionPaymentRepository {
  create(data: SubscriptionPayment): Promise<SubscriptionPayment | boolean>;
  update(
    paymentId: string,
    data: Partial<SubscriptionPayment>
  ): Promise<SubscriptionPayment>;
  findByIdAndUpdate(
    id: string,
    data: Partial<SubscriptionPayment>
  ): Promise<SubscriptionPayment>;

  cancelPendingPaymentsByUser(userId: string): Promise<SubscriptionPayment[]>;
}
