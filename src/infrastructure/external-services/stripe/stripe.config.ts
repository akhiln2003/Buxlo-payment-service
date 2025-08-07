import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripeApiKey = process.env.STRIPE_SECRET_KEY;

if (!stripeApiKey) {
  console.error("STRIPE_SECRET_KEY is not defined in environment variables");
}

export const stripe = new Stripe(stripeApiKey || "dummy_key_for_development", {
  apiVersion: "2025-07-30.basil", 
});
