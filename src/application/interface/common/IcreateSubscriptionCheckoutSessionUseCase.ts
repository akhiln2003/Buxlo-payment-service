import { Subscription } from "../../../domain/entities/subscription";


export interface IcreateSubscriptionCheckoutSessionUseCase {
  execute(
    data: Subscription,
    userId: string,
    type: "booking" | "subscription"
  ): Promise<string>;
}
