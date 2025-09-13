import { BadRequest } from "@buxlo/common";
import { IStripeService } from "../../../domain/interfaces/IstripeService";
import {
  ICreateSubscriptionCheckoutSessionUseCase,
  ISubscriptionCheckoutData,
} from "../../interface/common/ICreateSubscriptionCheckoutSessionUseCase";
import { SubscriptionPlan } from "../../../infrastructure/@types/enums/subscriptionPlanType";
import { IsubscriptionPaymentRepository } from "../../../domain/interfaces/IsubscriptionPaymentRepository";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import { IwalletRepository } from "../../../domain/interfaces/IwalletRepository";
import { IPaymentHistoryRepository } from "../../../domain/interfaces/IPaymentHistoryRepository";

export class CreateSubscriptionCheckoutSessionUseCase
  implements ICreateSubscriptionCheckoutSessionUseCase
{
  constructor(
    private _stripeService: IStripeService,
    private _subscriptionPaymentRepo: IsubscriptionPaymentRepository,
    private _walletRepository: IwalletRepository,
    private _paymentHistoryRepository: IPaymentHistoryRepository
  ) {}
  async execute(
    data: ISubscriptionCheckoutData,
    userId: string,
    type: "booking" | "subscription"
  ): Promise<string> {
    const pendingPayments =
      await this._subscriptionPaymentRepo.cancelPendingPaymentsByUser(
        userId as string
      );
    await Promise.all(
      pendingPayments.map(async (payment) => {
        const historyData = {
          amount: payment.amount,
          category: "slotBooking",
          paymentId: payment.paymentId,
          status: payment.status,
          userId: payment.userId,
        };

        await this._paymentHistoryRepository.create(historyData);
      })
    );
    for (const p of pendingPayments) {
      try {
        await this._stripeService.expireCheckoutSession(p.paymentId);
      } catch (err) {
        console.error("Failed to expire stripe session", err);
      }
    }

    const amount = data.offer
      ? Number(data.price) - (Number(data.price) * Number(data.offer)) / 100
      : Number(data.price);

    const session = await this._stripeService.createCheckoutSession(
      amount,
      data.type,
      data.id as string,
      type
    );
    const newPayment = {
      amount,
      userId: userId,
      type: data.type as SubscriptionPlan,
      status: PaymentStatus.PENDING,
      paymentId: session.id,
      subscriptionId: data.id as string,
    };

    const payment = await this._subscriptionPaymentRepo.create(newPayment);

    await this._walletRepository.updateWallet(
      process.env.ADMIN_ID!,
      "Primary",
      {
        balance: amount,
      }
    );

    if (!payment || typeof payment === "boolean") {
      throw new BadRequest(
        "A pending payment already exists for this user . Please complete or cancel the previous transaction."
      );
    } else {
      return session.url;
    }
  }
}
