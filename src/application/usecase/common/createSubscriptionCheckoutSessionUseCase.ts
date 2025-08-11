import { BadRequest } from "@buxlo/common";
import { IStripeService } from "../../../domain/interfaces/IstripeService";
import { IcreateSubscriptionCheckoutSessionUseCase } from "../../interface/common/IcreateSubscriptionCheckoutSessionUseCase";
import { Subscription } from "../../../domain/entities/subscription";
import { SubscriptionPlan } from "../../../infrastructure/@types/enums/subscriptionPlanType";
import { IsubscriptionPaymentRepository } from "../../../domain/interfaces/IsubscriptionPaymentRepository";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import { IwalletRepository } from "../../../domain/interfaces/IwalletRepository";

export class CreateSubscriptionCheckoutSessionUseCase
  implements IcreateSubscriptionCheckoutSessionUseCase
{
  constructor(
    private stripeService: IStripeService,
    private paymentRepo: IsubscriptionPaymentRepository,
    private walletRepository: IwalletRepository
  ) {}
  async execute(
    data: Subscription,
    userId: string,
    type: "booking" | "subscription"
  ): Promise<string> {
    const amount = data.offer
      ? Number(data.price) - (Number(data.price) * Number(data.offer)) / 100
      : Number(data.price);

    const session = await this.stripeService.createCheckoutSession(
      amount,
      data.type,
      data.id as string,
      type
    );
    const newPayment = {
      amount,
      userId: userId,
      type: data.type as SubscriptionPlan,
      status: PaymentStatus.BOOKED,
      paymentId: session.id,
    };

    const payment = await this.paymentRepo.create(newPayment);
    await this.walletRepository.updateWallet(process.env.ADMIN_ID!, "Admin", {
      balance: amount,
    });

    if (!payment || typeof payment === "boolean") {
      throw new BadRequest(
        "A pending payment already exists for this user . Please complete or cancel the previous transaction."
      );
    } else {
      return session.url;
    }
  }
}
