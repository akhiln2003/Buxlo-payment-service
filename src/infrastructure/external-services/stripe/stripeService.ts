import { BadRequest } from "@buxlo/common";
import { stripe } from "./stripe.config";

export class StripeService {
  async createCheckoutSession(amount: number, mentorName: string, slotId: string): Promise<string> {
    // Add input validation
    if (!amount || isNaN(amount) || amount <= 0) {
      throw new BadRequest("Invalid amount provided");
    }
    
    if (!mentorName || typeof mentorName !== 'string') {
      throw new BadRequest("Invalid mentor name provided");
    }
    
    if (!slotId || typeof slotId !== 'string') {
      throw new BadRequest("Invalid slot ID provided");
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: `Session with ${mentorName}`,
              },
              unit_amount: Math.round(amount * 100), // Ensure it's an integer
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONT_END_BASE_URL}/success?slotId=${slotId}`,
        cancel_url: `${process.env.FRONT_END_BASE_URL}/cancel`,
      });
      
      // Return the checkout URL instead of session ID
      return session.url!; // The ! ensures TypeScript knows it's not null
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw new BadRequest("Failed to create checkout session");
    }
  }
}