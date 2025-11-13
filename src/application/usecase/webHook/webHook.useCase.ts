import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import { IWebHookUseCase } from "../../interface/webHook/IWebHookUseCase";
import Stripe from "stripe";
import { IPaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import { IsubscriptionPaymentRepository } from "../../../domain/interfaces/IsubscriptionPaymentRepository";
import {
  updateAvailability,
  updateSubscription,
} from "../../../infrastructure/rpc/grpc/client";
import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import { IPaymentHistoryRepository } from "../../../domain/interfaces/IPaymentHistoryRepository";
import { PaymentHistoryStatus } from "../../../infrastructure/@types/enums/PaymentHistoryStatus";
import { PaymentType } from "../../../infrastructure/@types/enums/PaymentType";

export class WebHookUseCase implements IWebHookUseCase {
  constructor(
    private _stripe: Stripe,
    private _bookngPaymentRepository: IPaymetRepository,
    private _subscriptionPaymentRepository: IsubscriptionPaymentRepository,
    private _subscriptionPlanRepository: IsubscriptionRepository,
    private _paymentHistoryRepository: IPaymentHistoryRepository
  ) {}

  async execute(body: Buffer, sig: string, stripeSecret: string): Promise<any> {
    try {
      console.log("🔍 [UseCase] Constructing Stripe event...");
      console.log("🔍 [UseCase] Body type:", body.constructor.name);
      console.log("🔍 [UseCase] Body length:", body.length);
      console.log("🔍 [UseCase] Signature:", sig.substring(0, 50) + "...");
      console.log("🔍 [UseCase] Secret exists:", !!stripeSecret);
      console.log(
        "🔍 [UseCase] Secret starts with:",
        stripeSecret.substring(0, 10)
      );

      // 🔍 DEBUG: Check the first 200 characters of the body
      console.log(
        "🔍 [UseCase] Body preview:",
        body.toString("utf8").substring(0, 200)
      );

      // 🔍 DEBUG: Compute what Stripe expects to see
      const expectedSignature = sig
        .split(",")
        .find((s) => s.startsWith("v1="))
        ?.split("=")[1];
      console.log("🔍 [UseCase] Expected signature (v1):", expectedSignature);

      // ⚡ CRITICAL: Stripe signature verification
      const event = this._stripe.webhooks.constructEvent(
        body,
        sig,
        stripeSecret
      );

      console.log("✅ [UseCase] Event constructed successfully");
      console.log("✅ [UseCase] Event type:", event.type);
      console.log("✅ [UseCase] Event ID:", event.id);

      const session = event.data.object as Stripe.Checkout.Session;
      const type = session.metadata?.type;

      console.log("📦 [UseCase] Session ID:", session.id);
      console.log("📦 [UseCase] Payment type:", type);

      switch (event.type) {
        case "checkout.session.completed": {
          console.log("✅ [UseCase] Payment completed");
          await this.handleCheckoutCompleted(session, type);
          break;
        }

        case "checkout.session.expired": {
          console.log("⏰ [UseCase] Payment expired");
          await this.handleCheckoutExpired(session, type);
          break;
        }

        case "payment_intent.canceled": {
          console.log("❌ [UseCase] Payment failed");
          await this.handlePaymentCanceled(session, type);
          break;
        }

        case "invoice.paid":
          console.log("💰 [UseCase] Subscription renewed:", event.data.object);
          break;

        case "invoice.payment_failed":
          console.log(
            "❌ [UseCase] Invoice payment failed:",
            event.data.object
          );
          break;

        default:
          console.log(`⚠️ [UseCase] Unhandled event type: ${event.type}`);
      }

      return {
        success: true,
        eventType: event.type,
        eventId: event.id,
      };
    } catch (error: any) {
      console.error("❌ [UseCase] Webhook processing error:", error.message);

      // Check if it's a Stripe signature verification error
      if (error.type === "StripeSignatureVerificationError") {
        console.error("🔴 [UseCase] Stripe signature verification failed!");
        console.error("🔴 [UseCase] Error details:", error);
        throw new Error("Webhook signature verification failed");
      }

      throw error;
    }
  }

  private mapPaymentStatusToHistoryStatus(
    status: PaymentStatus
  ): PaymentHistoryStatus {
    switch (status) {
      case PaymentStatus.BOOKED:
        return PaymentHistoryStatus.COMPLETED;
      case PaymentStatus.CANCELED:
        return PaymentHistoryStatus.FAILD;
      case PaymentStatus.PENDING:
        return PaymentHistoryStatus.PENDING;
      case PaymentStatus.FAILD:
        return PaymentHistoryStatus.FAILD;
      case PaymentStatus.AVAILABLE:
        return PaymentHistoryStatus.PENDING;
      default:
        throw new Error(`Unknown PaymentStatus: ${status}`);
    }
  }

  private async handleCheckoutCompleted(
    session: Stripe.Checkout.Session,
    type: string | undefined
  ): Promise<void> {
    if (type === "booking") {
      console.log("📅 [UseCase] Processing booking payment");

      const paymentrepo = await this._bookngPaymentRepository.update(
        session.id,
        {
          status: PaymentStatus.BOOKED,
        }
      );

      const data = {
        amount: paymentrepo.amount,
        category: "slotBooking",
        paymentId: paymentrepo.paymentId,
        type: PaymentType.DEBIT,
        status: this.mapPaymentStatusToHistoryStatus(
          paymentrepo.status !== PaymentStatus.AVAILABLE
            ? paymentrepo.status
            : PaymentStatus.PENDING
        ),
        userId: paymentrepo.userId,
      };

      await this._paymentHistoryRepository.create(data);

      await updateAvailability({
        id: paymentrepo.slotId,
        status: "booked",
        isBooked: true,
      });

      console.log("✅ [UseCase] Booking payment processed successfully");
    } else {
      console.log("💎 [UseCase] Processing subscription payment");

      const subscriptionPaymetrepo =
        await this._subscriptionPaymentRepository.update(session.id, {
          status: PaymentStatus.BOOKED,
        });

      const subscriptionPlan = await this._subscriptionPlanRepository.findById(
        subscriptionPaymetrepo.subscriptionId
      );

      const premiumEndDate = new Date();
      switch (subscriptionPlan.type) {
        case "Day":
          premiumEndDate.setDate(premiumEndDate.getDate() + 1);
          break;
        case "Month":
          premiumEndDate.setMonth(premiumEndDate.getMonth() + 1);
          break;
        case "Year":
          premiumEndDate.setFullYear(premiumEndDate.getFullYear() + 1);
          break;
        default:
          throw new Error("Invalid subscription plan duration");
      }

      const data = {
        amount: subscriptionPaymetrepo.amount,
        category: "subscription",
        paymentId: subscriptionPaymetrepo.paymentId,
        type: PaymentType.DEBIT,
        status: this.mapPaymentStatusToHistoryStatus(
          subscriptionPaymetrepo.status !== PaymentStatus.AVAILABLE
            ? subscriptionPaymetrepo.status
            : PaymentStatus.PENDING
        ),
        userId: subscriptionPaymetrepo.userId,
      };

      await this._paymentHistoryRepository.create(data);

      await updateSubscription({
        userId: subscriptionPaymetrepo.userId,
        premiumId: subscriptionPaymetrepo.subscriptionId,
        premiumEndDate: premiumEndDate.toISOString(),
      });

      console.log("✅ [UseCase] Subscription payment processed successfully");
    }
  }

  private async handleCheckoutExpired(
    session: Stripe.Checkout.Session,
    type: string | undefined
  ): Promise<void> {
    if (type === "booking") {
      const paymentrepo = await this._bookngPaymentRepository.update(
        session.id,
        {
          status: PaymentStatus.FAILD,
        }
      );

      const data = {
        amount: paymentrepo.amount,
        category: "slotBooking",
        paymentId: paymentrepo.paymentId,
        type: PaymentType.DEBIT,
        status: this.mapPaymentStatusToHistoryStatus(
          paymentrepo.status !== PaymentStatus.AVAILABLE
            ? paymentrepo.status
            : PaymentStatus.PENDING
        ),
        userId: paymentrepo.userId,
      };

      await this._paymentHistoryRepository.create(data);
    } else {
      const subscriptionPaymetrepo =
        await this._subscriptionPaymentRepository.update(session.id, {
          status: PaymentStatus.FAILD,
        });

      const data = {
        amount: subscriptionPaymetrepo.amount,
        category: "subscription",
        paymentId: subscriptionPaymetrepo.paymentId,
        type: PaymentType.DEBIT,
        status: this.mapPaymentStatusToHistoryStatus(
          subscriptionPaymetrepo.status !== PaymentStatus.AVAILABLE
            ? subscriptionPaymetrepo.status
            : PaymentStatus.PENDING
        ),
        userId: subscriptionPaymetrepo.userId,
      };

      await this._paymentHistoryRepository.create(data);
    }
  }

  private async handlePaymentCanceled(
    session: Stripe.Checkout.Session,
    type: string | undefined
  ): Promise<void> {
    if (type === "booking") {
      const paymentrepo = await this._bookngPaymentRepository.update(
        session.id,
        {
          status: PaymentStatus.FAILD,
        }
      );

      const data = {
        amount: paymentrepo.amount,
        category: "slotBooking",
        paymentId: paymentrepo.paymentId,
        type: PaymentType.DEBIT,
        status: this.mapPaymentStatusToHistoryStatus(
          paymentrepo.status !== PaymentStatus.AVAILABLE
            ? paymentrepo.status
            : PaymentStatus.PENDING
        ),
        userId: paymentrepo.userId,
      };

      await this._paymentHistoryRepository.create(data);
    } else {
      const subscriptionPaymetrepo =
        await this._subscriptionPaymentRepository.update(session.id, {
          status: PaymentStatus.FAILD,
        });

      const data = {
        amount: subscriptionPaymetrepo.amount,
        category: "subscription",
        paymentId: subscriptionPaymetrepo.paymentId,
        type: PaymentType.DEBIT,
        status: this.mapPaymentStatusToHistoryStatus(
          subscriptionPaymetrepo.status !== PaymentStatus.AVAILABLE
            ? subscriptionPaymetrepo.status
            : PaymentStatus.PENDING
        ),
        userId: subscriptionPaymetrepo.userId,
      };

      await this._paymentHistoryRepository.create(data);
    }
  }
}
