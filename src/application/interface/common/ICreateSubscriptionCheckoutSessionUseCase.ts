export interface ISubscriptionCheckoutData {
  price: number;
  offer: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ICreateSubscriptionCheckoutSessionUseCase {
  execute(
    data: ISubscriptionCheckoutData,
    userId: string,
    type: "booking" | "subscription"
  ): Promise<string>;
}
