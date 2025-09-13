import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import {
  SubscriptionMapper,
  SubscriptionResponseDto,
} from "../../dto/subscriptionResponse.dto";
import { IFetchSubscriptionPlanUseCase } from "../../interface/common/IFetchSubscriptionPlanUseCase";

export class FetchSubscriptionPlanUseCase
  implements IFetchSubscriptionPlanUseCase
{
  constructor(private _subscriptionRepository: IsubscriptionRepository) {}

  async execute(): Promise<SubscriptionResponseDto[]> {
    const datas = await this._subscriptionRepository.getSubscriptionDetails();
    return datas.map((sub) => SubscriptionMapper.toDto(sub));
  }
}
