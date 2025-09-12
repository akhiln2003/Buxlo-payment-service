import { z } from "zod";
import { SubscriptionPayment } from "../../entities/subscriptionPayment.entity";

export const SubscriptionPaymentResponseDto = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  amount: z.number(),
  type: z.enum(["Day", "Month", "Year"]),
  status: z.enum(["booked", "pending", "cancelled", "failed"]),
  paymentId: z.string(),
  subscriptionId: z.string(),
  transactionDate: z.date(),
  updatedAt: z.date(),
});

export type SubscriptionPaymentResponseDto = z.infer<
  typeof SubscriptionPaymentResponseDto
>;

export class SubscriptionPaymentMapper {
  static toDto(payment: SubscriptionPayment): SubscriptionPaymentResponseDto {
    return SubscriptionPaymentResponseDto.parse({
      id: payment.id,
      userId: payment.userId?.toString(),
      amount: Number(payment.amount),
      type: payment.type,
      status: payment.status,
      subscriptionId: payment.subscriptionId,
      paymentId: payment.paymentId,
      transactionDate: new Date(payment.transactionDate as Date),
      updatedAt: new Date(payment.updatedAt as Date),
    });
  }
}
