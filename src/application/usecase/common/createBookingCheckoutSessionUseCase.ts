import { BadRequest } from "@buxlo/common";
import { IpaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import { IStripeService } from "../../../domain/interfaces/IstripeService";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import {
  ICreateBookingCheckoutSessionUseCase,
  ICreateCheckoutSessionUseCaseDataProps,
} from "../../interface/common/ICreateCheckoutSessionUseCase";

export class CreateBookingCheckoutSessionUseCase
  implements ICreateBookingCheckoutSessionUseCase
{
  constructor(
    private _stripeService: IStripeService,
    private _paymentRepo: IpaymetRepository
  ) {}
  async execute(
    data: ICreateCheckoutSessionUseCaseDataProps,
    userId: string,
    type: "booking" | "subscription"
  ): Promise<string> {
    await this._paymentRepo.checkSlotExixt(data.id as string);
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
