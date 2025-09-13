import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import { IWebHookUseCase } from "../../interface/webHook/IWebHookUseCase";
import Stripe from "stripe";
import { IPaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import { IsubscriptionPaymentRepository } from "../../../domain/interfaces/IsubscriptionPaymentRepository";
import {
  updateAvailability,
  updateSubscription,
  // updateSubscription,
} from "../../../infrastructure/rpc/grpc/client";
import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import { IPaymentHistoryRepository } from "../../../domain/interfaces/IPaymentHistoryRepository";

export class WebHookUseCase implements IWebHookUseCase {
  constructor(
    private _stripe: Stripe,
    private _bookngPaymentRepository: IPaymetRepository,
    private _subscriptionPaymentRepository: IsubscriptionPaymentRepository,
    private _subscriptionPlanRepository: IsubscriptionRepository,
    private _paymentHistoryRepository: IPaymentHistoryRepository
  ) {}
  async execute(
    body: Buffer | string,
    sig: string | string[] | undefined,
    stripeSecret: string
  ): Promise<void> {
    const event = this._stripe.webhooks.constructEvent(
      body,
      sig as string,
      stripeSecret
    );
    const session = event.data.object as Stripe.Checkout.Session;
    const type = session.metadata?.type;

    switch (event.type) {
      case "checkout.session.completed": {
        console.log("payment completed");

        if (type == "booking") {
          const paymentrepo = await this._bookngPaymentRepository.update(
            event.data.object.id,
            {
              status: PaymentStatus.BOOKED,
            }
          );
          const data = {
            amount: paymentrepo.amount,
            category: "slotBooking",
            paymentId: paymentrepo.paymentId,
            status: paymentrepo.status,
            userId: paymentrepo.userId,
          };
          await this._paymentHistoryRepository.create(data);
          await updateAvailability({
            id: paymentrepo.slotId,
            status: "booked",
            isBooked: true,
          });
        } else {
          const subscriptionPaymetrepo =
            await this._subscriptionPaymentRepository.update(
              event.data.object.id,
              {
                status: PaymentStatus.BOOKED,
              }
            );

          const subscriptionPlan =
            await this._subscriptionPlanRepository.findById(
              subscriptionPaymetrepo.subscriptionId
            );

          const premiumEndDate = new Date();
          switch (
            subscriptionPlan.type // assuming subscriptionPlan.duration is "day" | "month" | "year"
          ) {
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
            status: subscriptionPaymetrepo.status,
            userId: subscriptionPaymetrepo.userId,
          };
          await this._paymentHistoryRepository.create(data);
          await updateSubscription({
            userId: subscriptionPaymetrepo.userId,
            premiumId: subscriptionPaymetrepo.subscriptionId,
            premiumEndDate: premiumEndDate.toISOString(),
          });
        }

        break;
      }
      case "checkout.session.expired": {
        console.log("payment expired");

        if (type == "booking") {
          const paymentrepo = await this._bookngPaymentRepository.update(
            event.data.object.id,
            {
              status: PaymentStatus.FAILD,
            }
          );
          const data = {
            amount: paymentrepo.amount,
            category: "slotBooking",
            paymentId: paymentrepo.paymentId,
            status: paymentrepo.status,
            userId: paymentrepo.userId,
          };
          await this._paymentHistoryRepository.create(data);
        } else {
          const subscriptionPaymetrepo =
            await this._subscriptionPaymentRepository.update(
              event.data.object.id,
              {
                status: PaymentStatus.FAILD,
              }
            );

          const data = {
            amount: subscriptionPaymetrepo.amount,
            category: "subscription",
            paymentId: subscriptionPaymetrepo.paymentId,
            status: subscriptionPaymetrepo.status,
            userId: subscriptionPaymetrepo.userId,
          };
          await this._paymentHistoryRepository.create(data);
        }
        break;
      }
      case "payment_intent.canceled": {
        console.log("payment faild");

        if (type == "booking") {
          const paymentrepo = await this._bookngPaymentRepository.update(
            event.data.object.id,
            {
              status: PaymentStatus.FAILD,
            }
          );

          const data = {
            amount: paymentrepo.amount,
            category: "slotBooking",
            paymentId: paymentrepo.paymentId,
            status: paymentrepo.status,
            userId: paymentrepo.userId,
          };
          await this._paymentHistoryRepository.create(data);
        } else {
          const subscriptionPaymetrepo =
            await this._subscriptionPaymentRepository.update(
              event.data.object.id,
              {
                status: PaymentStatus.FAILD,
              }
            );

          const data = {
            amount: subscriptionPaymetrepo.amount,
            category: "subscription",
            paymentId: subscriptionPaymetrepo.paymentId,
            status: subscriptionPaymetrepo.status,
            userId: subscriptionPaymetrepo.userId,
          };
          await this._paymentHistoryRepository.create(data);
        }
        break;
      }
      case "invoice.paid":
        console.log("Subscription renewed:", event.data.object);
        break;
      case "invoice.payment_failed":
        console.log("Payment failed:", event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }
}
