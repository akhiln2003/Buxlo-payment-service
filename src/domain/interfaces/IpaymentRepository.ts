import { PaymentStatus } from "../../infrastructure/@types/enums/paymentStatus";
import { Payment } from "../entities/bookingPayment.entites";

export interface IPaymetRepository {
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
  findByUserId(
    userId: string,
    page: number,
    status: PaymentStatus | "all"
  ): Promise<{ bookings: Payment[]; totalPages: number }>;
  cancelBooking(id: string): Promise<Payment>;
  cancelPendingPaymentsByUser(userId: string): Promise<Payment[]>;
}
