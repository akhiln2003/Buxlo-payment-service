import { z } from "zod";
import { SubscriptionEntity } from "../../infrastructure/database/sql/entity/subscription.entity";

export const SubscriptionResponseDto = z.object({
  id: z.string().uuid(),
  price: z.number(),
  offer: z.number(),
  type: z.enum(["Day", "Month", "Year"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type SubscriptionResponseDto = z.infer<typeof SubscriptionResponseDto>;

export class SubscriptionMapper {
  static toDto(subscription: SubscriptionEntity): SubscriptionResponseDto {
    return SubscriptionResponseDto.parse({
      id: subscription.id,
      price: Number(subscription.price),
      offer: Number(subscription.offer),
      type: subscription.type,
      createdAt: new Date(subscription.createdAt),
      updatedAt: new Date(subscription.updatedAt),
    });
  }
}
