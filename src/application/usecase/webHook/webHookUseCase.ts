import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import { IwebHookUseCase } from "../../interface/webHook/IwebHookUseCase";
import Stripe from "stripe";
import { IpaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
// import { updateAvailability } from "../../../infrastructure/rpc/grpc/client";

export class WebHookUseCase implements IwebHookUseCase {
  constructor(private stripe: Stripe, private paymetRepo: IpaymetRepository) {}
  async execute(
    body: Buffer | string,
    sig: string | string[] | undefined,
    stripeSecret: string
  ): Promise<void> {
    const event = this.stripe.webhooks.constructEvent(
      body,
      sig as string,
      stripeSecret
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const paymentrepo = await this.paymetRepo.update(event.data.object.id, {
          status: PaymentStatus.BOOKED,
        });
        console.log("paymentRepo", paymentrepo);

        // await updateAvailability({
        //   id: paymentrepo.slotId,
        //   status: "booked",
        //   isBooked: true,
        // });
        break;
      }
      case "checkout.session.expired":
        await this.paymetRepo.update(event.data.object.id, {
          status: PaymentStatus.FAILD,
        });

        break;

      case "payment_intent.canceled":
        await this.paymetRepo.update(event.data.object.id, {
          status: PaymentStatus.CANCELED,
        });
        break;
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
