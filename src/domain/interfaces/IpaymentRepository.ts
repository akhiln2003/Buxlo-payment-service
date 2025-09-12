import { Payment } from "../entities/bookingPayment.entites";

export interface IpaymetRepository {
  create(data: Payment): Promise<Payment | boolean>;
  update(paymentId: string, data: Partial<Payment>): Promise<Payment>;
  findByIdAndUpdate(id: string, data: Partial<Payment>): Promise<Payment>;
  findOne(slotId: string): Promise<Payment>;

  findAll(
    id: string,
    role: "user" | "mentor",
    page: number,
    searchData?: string
  ): Promise<{ bookings: Payment[]; totalPages: number }>;
  cancelPendingPaymentsByUser(userId: string): Promise<Payment[]>;
}
