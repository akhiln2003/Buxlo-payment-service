import { BadRequest } from "@buxlo/common";
import { IPaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import { IStripeService } from "../../../domain/interfaces/IstripeService";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import {
  ICreateBookingCheckoutSessionUseCase,
  ICreateCheckoutSessionUseCaseDataProps,
} from "../../interface/common/ICreateCheckoutSessionUseCase";
import { IPaymentHistoryRepository } from "../../../domain/interfaces/IPaymentHistoryRepository";

export class CreateBookingCheckoutSessionUseCase
  implements ICreateBookingCheckoutSessionUseCase
{
  constructor(
    private _stripeService: IStripeService,
    private _paymentRepo: IPaymetRepository,
    private _paymentHistoryRepository: IPaymentHistoryRepository
  ) {}
  async execute(
    data: ICreateCheckoutSessionUseCaseDataProps,
    userId: string,
    type: "booking" | "subscription"
  ): Promise<string> {
    const pendingPayments = await this._paymentRepo.cancelPendingPaymentsByUser(
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
    const session = await this._stripeService.createCheckoutSession(
      data.salary,
      data.name,
      data.id as string,
      type
    );
    const newPayment = {
      amount: data.salary,
      mentorId: data.mentorId,
      userId: userId,
      slotId: data.id as string,
      status: PaymentStatus.PENDING,
      paymentId: session.id,
    };
    const payment = await this._paymentRepo.create(newPayment);

    if (!payment || typeof payment === "boolean") {
      throw new BadRequest(
        "A pending payment already exists for this user . Please complete or cancel the previous transaction."
      );
    } else {
      return session.url;
    }
  }
}
