import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IWebHookUseCase } from "../../../application/interface/webHook/IWebHookUseCase";

export class WebHookController {
  constructor(private _webHookUseCase: IWebHookUseCase) {
    // Bind the method to preserve 'this' context
    this.webHook = this.webHook.bind(this);
  }
  
  async webHook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("🔐 Webhook received - verifying signature");

      const sig = req.headers["stripe-signature"];
      const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET!;
      
      // ⚡ CRITICAL: Ensure body is a Buffer for Stripe verification
      if (!Buffer.isBuffer(req.body)) {
        console.error("❌ Body is not a Buffer! Type:", typeof req.body);
        res.status(HttpStatusCode.BadRequest).json({
          error: "Invalid webhook body format - expected raw Buffer"
        });
        return;
      }

      // Handle signature header (can be string, string[], or undefined)
      if (!sig || typeof sig !== "string") {
        console.error("❌ Missing or invalid stripe-signature header");
        res.status(HttpStatusCode.BadRequest).json({
          error: "Missing stripe-signature header"
        });
        return;
      }

      console.log("✅ Body is Buffer, length:", req.body.length);
      console.log("✅ Signature present:", sig.substring(0, 50) + "...");
      
      const updateData = await this._webHookUseCase.execute(
        req.body,
        sig,
        stripeSecret
      );
      
      console.log("✅ Webhook processed successfully");
      res.status(HttpStatusCode.OK).json({ received: true, updateData });
    } catch (error: any) {
      console.error("❌ Webhook error:", error.message);
      console.error("Stack:", error.stack);
      
      // Stripe expects 400 for signature verification failures
      if (error.message?.includes("signature") || error.message?.includes("webhook")) {
        res.status(HttpStatusCode.BadRequest).json({
          error: "Webhook signature verification failed"
        });
        return;
      }
      
      next(error);
    }
  }
}