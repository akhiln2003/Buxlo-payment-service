import { z } from "zod";
import { SubscriptionPaymentEntity } from "../../infrastructure/database/sql/entity/subscriptionPayment.entity";

export const SubscriptionPaymentResponseDto = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  amount: z.number(),
  type: z.enum(["Day", "Month", "Year"]),
  status: z.enum(["booked", "pending", "cancelled", "failed"]),
  paymentId: z.string(),
  transactionDate: z.date(),
  updatedAt: z.date(),
});

export type SubscriptionPaymentResponseDto = z.infer<
  typeof SubscriptionPaymentResponseDto
>;

export class SubscriptionPaymentMapper {
  static toDto(
    payment: SubscriptionPaymentEntity
  ): SubscriptionPaymentResponseDto {
    return SubscriptionPaymentResponseDto.parse({
      id: payment.id,
      userId: payment.userId?.toString(),
      amount: Number(payment.amount),
      type: payment.type,
      status: payment.status,
      paymentId: payment.paymentId,
      transactionDate: new Date(payment.transactionDate),
      updatedAt: new Date(payment.updatedAt),
    });
  }
}
