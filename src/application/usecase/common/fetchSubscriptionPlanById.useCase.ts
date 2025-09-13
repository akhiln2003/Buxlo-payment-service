import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import {
  SubscriptionMapper,
  SubscriptionResponseDto,
} from "../../dto/subscriptionResponse.dto";
import { IFetchSubscriptionPlanByIdUseCase } from "../../interface/common/IFetchSubscriptionPlanByIdUseCase";

export class FetchSubscriptionPlanByIdUseCase
  implements IFetchSubscriptionPlanByIdUseCase
{
  constructor(private _subscriptionRepository: IsubscriptionRepository) {}

  async execute(id: string): Promise<SubscriptionResponseDto> {
    const data = await this._subscriptionRepository.findById(id);

    return SubscriptionMapper.toDto(data);
  }
}
