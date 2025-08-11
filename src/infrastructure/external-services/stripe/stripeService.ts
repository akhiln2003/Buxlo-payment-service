import { BadRequest } from "@buxlo/common";
import { stripe } from "./stripe.config";

export class StripeService {
  async createCheckoutSession(amount: number, name: string, id: string , type:string): Promise<{url: string, id: string}> {
    // Add input validation
    if (!amount || isNaN(amount) || amount <= 0) {
      throw new BadRequest("Invalid amount provided");
    }
    
    if (!name || typeof name !== 'string') {
      throw new BadRequest("Invalid mentor name provided");
    }
    
    if (!id || typeof id !== 'string') {
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
                name: `Payment to ${name}`,
              },
              unit_amount: Math.round(amount * 100), 
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONT_END_BASE_URL}/${type}success?id=${id}`,
        cancel_url: `${process.env.FRONT_END_BASE_URL}/cancel`,
      });
      
      // Return the checkout URL instead of session ID
      return {url:session.url! , id:session.id}; 
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw new BadRequest("Failed to create checkout session");
    }
  }
}