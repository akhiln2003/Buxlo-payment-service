import { BadRequest } from "@buxlo/common";
import { IpaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import { IStripeService } from "../../../domain/interfaces/IstripeService";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import {
  IcreateBookingCheckoutSessionUseCase,
  IcreateCheckoutSessionUseCaseDataProps,
} from "../../interface/common/IcreateCheckoutSessionUseCase";

export class CreateBookingCheckoutSessionUseCase
  implements IcreateBookingCheckoutSessionUseCase
{
  constructor(
    private stripeService: IStripeService,
    private paymentRepo: IpaymetRepository
  ) {}
  async execute(
    data: IcreateCheckoutSessionUseCaseDataProps,
    userId: string,
    type: "booking" | "subscription"
  ): Promise<string> {
    const session = await this.stripeService.createCheckoutSession(
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
    const payment = await this.paymentRepo.create(newPayment);

    if (!payment || typeof payment === "boolean") {
      throw new BadRequest(
        "A pending payment already exists for this user . Please complete or cancel the previous transaction."
      );
    } else {
      return session.url;
    }
  }
}
