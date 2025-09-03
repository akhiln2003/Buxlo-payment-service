export interface IStripeService {
  createCheckoutSession(
    amount: number,
    name: string,
    id: string,
    type: "booking" | "subscription"
  ): Promise<{ url: string; id: string }>;
  expireCheckoutSession(sessionId: string): Promise<void>;
}
