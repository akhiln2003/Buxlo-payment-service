import { SubscriptionPaymentResponseDto } from "../../../domain/zodSchemaDto/output/subscriptionPaymentResponse.dto";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";

export interface IupdateSubscriptionPaymetUseCase {
  execute(
    id: string,
    data: { status: PaymentStatus }
  ): Promise<SubscriptionPaymentResponseDto>;
}
