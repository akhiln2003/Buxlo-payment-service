import { z } from "zod";
import { Subscription } from "../../entities/subscription";

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
  static toDto(subscription: Subscription): SubscriptionResponseDto {
    return SubscriptionResponseDto.parse({
      id: subscription.id,
      price: Number(subscription.price),
      offer: Number(subscription.offer),
      type: subscription.type,
      createdAt: new Date(subscription.createdAt as Date),
      updatedAt: new Date(subscription.updatedAt as Date),
    });
  }
}
