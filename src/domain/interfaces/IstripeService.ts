export interface IStripeService {
  createCheckoutSession(
    amount: number,
    mentorName: string,
    slotId: string
  ): Promise<string>;
}
