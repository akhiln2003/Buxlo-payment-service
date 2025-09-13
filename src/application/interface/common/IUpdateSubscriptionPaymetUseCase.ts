import { SubscriptionPaymentResponseDto } from "../../dto/subscriptionPaymentResponse.dto";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";

export interface IUpdateSubscriptionPaymetUseCase {
  execute(
    id: string,
    data: { status: PaymentStatus }
  ): Promise<SubscriptionPaymentResponseDto>;
}
