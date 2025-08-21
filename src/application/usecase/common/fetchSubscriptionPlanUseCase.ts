import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import { SubscriptionResponseDto } from "../../../zodSchemaDto/output/subscriptionResponse.dto";
import { IfetchSubscriptionPlanUseCase } from "../../interface/common/IfetchSubscriptionPlanUseCase";

export class FetchSubscriptionPlanUseCase
  implements IfetchSubscriptionPlanUseCase
{
  constructor(private _subscriptionRepository: IsubscriptionRepository) {}

  async execute(): Promise<SubscriptionResponseDto[]> {
    return await this._subscriptionRepository.getSubscriptionDetails();
  }
}
