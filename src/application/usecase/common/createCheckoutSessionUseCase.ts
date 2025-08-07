import { IStripeService } from "../../../domain/interfaces/IstripeService";
import { IcreateCheckoutSessionUseCase } from "../../interface/common/IcreateCheckoutSessionUseCase";

export class CreateCheckoutSessionUseCase
  implements IcreateCheckoutSessionUseCase
{
  constructor(private stripeService: IStripeService) {}
  async execute(
    amount: number,
    mentorName: string,
    slotId: string
  ): Promise<string> {
    try {
      console.log(
        "Creating checkout session with amount:",
        amount,
        "mentorName:",
        mentorName,
        "slotId:",
        slotId
      );
      const sessionId = await this.stripeService.createCheckoutSession(
        amount,
        mentorName,
        slotId
      );
      console.log("Checkout session created with ID:", sessionId);
      return sessionId;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return "";
    }
  }
}
