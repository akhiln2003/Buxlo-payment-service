import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import { IUpdateSubscriptionPaymetUseCase } from "../../interface/common/IUpdateSubscriptionPaymetUseCase";
import { IsubscriptionPaymentRepository } from "../../../domain/interfaces/IsubscriptionPaymentRepository";
import {
  SubscriptionPaymentMapper,
  SubscriptionPaymentResponseDto,
} from "../../../domain/zodSchemaDto/output/subscriptionPaymentResponse.dto";

export class UpdateSubscriptionPaymetUseCase
  implements IUpdateSubscriptionPaymetUseCase
{
  constructor(
    private _subscriptionPaymentRepository: IsubscriptionPaymentRepository
  ) {}
  async execute(
    id: string,
    data: { status: PaymentStatus }
  ): Promise<SubscriptionPaymentResponseDto> {
    const updatedData = await this._subscriptionPaymentRepository.update(
      id,
      data
    );
    return SubscriptionPaymentMapper.toDto(updatedData);
  }
}
