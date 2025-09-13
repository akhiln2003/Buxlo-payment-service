import { PaymentHistory } from "../entities/paymentHistory.entityes";

export interface IPaymentHistoryRepository {
  create(data: PaymentHistory): Promise<PaymentHistory | boolean>;
  update(
    paymentId: string,
    data: Partial<PaymentHistory>
  ): Promise<PaymentHistory>;
  findByIdAndUpdate(
    id: string,
    data: Partial<PaymentHistory>
  ): Promise<PaymentHistory>;
  //   findOne(slotId: string): Promise<PaymentHistory>;

  findAll(
    id: string,
    role: "user" | "mentor",
    page: number,
    searchData?: string
  ): Promise<{ bookings: PaymentHistory[]; totalPages: number }>;
  cancelPendingPaymentsByUser(userId: string): Promise<PaymentHistory[]>;
}
