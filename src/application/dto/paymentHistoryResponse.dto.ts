import { z } from "zod";
import { PaymentHistory } from "../../domain/entities/paymentHistory.entityes";
import { PaymentHistoryStatus } from "../../infrastructure/@types/enums/PaymentHistoryStatus";
import { PaymentType } from "../../infrastructure/@types/enums/PaymentType";

export const PaymentHistoryResponseDto = z.object({
  id: z.string().uuid(),
  userId: z
    .string()
    .regex(/^[0-9a-f]{24}$/, { message: "Invalid user ID format" }),
  amount: z.number(),
  status: z.nativeEnum(PaymentHistoryStatus),
  type: z.nativeEnum(PaymentType),
  paymentId: z.string(),
  category: z.string(),
  transactionDate: z.date(),
  updatedAt: z.date().nullable(),
});

export type PaymentHistoryResponseDto = z.infer<
  typeof PaymentHistoryResponseDto
>;

export class PaymentHistoryMapper {
  static toDto(payment: PaymentHistory): PaymentHistoryResponseDto {
    return PaymentHistoryResponseDto.parse({
      id: payment.id,
      userId: payment.userId,
      amount: Number(payment.amount),
      status: payment.status,
      type: payment.type,
      paymentId: payment.paymentId,
      category: payment.category,
      transactionDate: new Date(payment.transactionDate as Date),
      updatedAt: payment.updatedAt ? new Date(payment.updatedAt) : null,
    });
  }
}
