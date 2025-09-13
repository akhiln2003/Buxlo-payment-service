import { z } from "zod";
import { Payment } from "../../domain/entities/bookingPayment.entites";

export const BookingPaymentResponseDto = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  mentorId: z.string(),
  amount: z.number(),
  status: z.enum(["available", "booked", "cancelled", "pending", "failed"]),
  paymentId: z.string(),
  slotId: z.string(),
  transactionDate: z.date(),
  updatedAt: z.date().nullable(),
});

export type BookingPaymentResponseDto = z.infer<
  typeof BookingPaymentResponseDto
>;

export class BookingPaymentMapper {
  static toDto(payment: Payment): BookingPaymentResponseDto {
    return BookingPaymentResponseDto.parse({
      id: payment.id,
      userId: payment.userId,
      mentorId: payment.mentorId,
      amount: Number(payment.amount),
      status: payment.status,
      paymentId: payment.paymentId,
      slotId: payment.slotId,
      transactionDate: new Date(payment.transactionDate as Date),
      updatedAt: payment.updatedAt ? new Date(payment.updatedAt) : null,
    });
  }
}
