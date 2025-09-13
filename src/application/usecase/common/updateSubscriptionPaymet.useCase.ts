import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import { IUpdateSubscriptionPaymetUseCase } from "../../interface/common/IUpdateSubscriptionPaymetUseCase";
import { IsubscriptionPaymentRepository } from "../../../domain/interfaces/IsubscriptionPaymentRepository";
import {
  SubscriptionPaymentMapper,
  SubscriptionPaymentResponseDto,
} from "../../dto/subscriptionPaymentResponse.dto";
import { IPaymentHistoryRepository } from "../../../domain/interfaces/IPaymentHistoryRepository";

export class UpdateSubscriptionPaymetUseCase
  implements IUpdateSubscriptionPaymetUseCase
{
  constructor(
    private _subscriptionPaymentRepository: IsubscriptionPaymentRepository,
        private _paymentHistoryRepository: IPaymentHistoryRepository

  ) {}
  async execute(
    id: string,
    data: { status: PaymentStatus }
  ): Promise<SubscriptionPaymentResponseDto> {
    const updatedData = await this._subscriptionPaymentRepository.update(
      id,
      data
    );

    const historyData = {
          amount: updatedData.amount,
          category: "slotBooking",
          paymentId: updatedData.paymentId,
          status: updatedData.status,
          userId: updatedData.userId,
        };

        await this._paymentHistoryRepository.create(historyData);
    return SubscriptionPaymentMapper.toDto(updatedData);
  }
}
