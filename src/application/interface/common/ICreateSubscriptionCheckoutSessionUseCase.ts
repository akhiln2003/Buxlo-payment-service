import { Subscription } from "../../../domain/entities/subscription";


export interface ICreateSubscriptionCheckoutSessionUseCase {
  execute(
    data: Subscription,
    userId: string,
    type: "booking" | "subscription"
  ): Promise<string>;
}
