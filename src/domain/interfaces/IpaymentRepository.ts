import { BookingPaymentResponseDto } from "../../zodSchemaDto/output/bookingPaymentResponse.dto";
import { Payment } from "../entities/bookingPaymentEntites";

export interface IpaymetRepository {
  create(data: Payment): Promise<BookingPaymentResponseDto | boolean>;
  update(
    paymentId: string,
    data: Partial<Payment>
  ): Promise<BookingPaymentResponseDto>;
  findOne(slotId: string): Promise<BookingPaymentResponseDto>;
  findAll(
    id: string,
    role: "user" | "mentor"
  ): Promise<BookingPaymentResponseDto[]>;
}
