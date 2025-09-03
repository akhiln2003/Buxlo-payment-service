import { BadRequest } from "@buxlo/common";
import { stripe } from "./stripe.config";
import { IStripeService } from "../../../domain/interfaces/IstripeService";

export class StripeService implements IStripeService {
  async createCheckoutSession(
    amount: number,
    name: string,
    id: string,
    type: string
  ): Promise<{ url: string; id: string }> {
    if (!amount || isNaN(amount) || amount <= 0) {
      throw new BadRequest("Invalid amount provided");
    }

    if (!name || typeof name !== "string") {
      throw new BadRequest("Invalid mentor name provided");
    }

    if (!id || typeof id !== "string") {
      throw new BadRequest("Invalid slot ID provided");
    }

    try {
      const fiveMinutesFromNow = Math.floor(Date.now() / 1000) + 30 * 60; // current time + 5 mins

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: `Payment to ${name}`,
              },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONT_END_BASE_URL}/${type}success?id=${id}`,
        cancel_url: `${process.env.FRONT_END_BASE_URL}/cancel?type=${type}&id={CHECKOUT_SESSION_ID}`,
        expires_at: fiveMinutesFromNow, 

        metadata: {
          type,
        },
      });

      // Return the checkout URL instead of session ID
      return { url: session.url!, id: session.id };
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw new BadRequest("Failed to create checkout session");
    }
  }

  async expireCheckoutSession(sessionId: string): Promise<void> {
    try {
      await stripe.checkout.sessions.expire(sessionId);
    } catch (err) {
      console.error("Failed to expire stripe session", err);
      throw new BadRequest("Could not expire old stripe session");
    }
  }
}
