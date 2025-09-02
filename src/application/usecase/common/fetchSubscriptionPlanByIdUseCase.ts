import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import {
  SubscriptionMapper,
  SubscriptionResponseDto,
} from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";
import { IfetchSubscriptionPlanByIdUseCase } from "../../interface/common/IfetchSubscriptionPlanByIdUseCase";

export class FetchSubscriptionPlanByIdUseCase
  implements IfetchSubscriptionPlanByIdUseCase
{
  constructor(private _subscriptionRepository: IsubscriptionRepository) {}

  async execute(id: string): Promise<SubscriptionResponseDto> {
    const data = await this._subscriptionRepository.findById(id);

    return SubscriptionMapper.toDto(data);
  }
}
