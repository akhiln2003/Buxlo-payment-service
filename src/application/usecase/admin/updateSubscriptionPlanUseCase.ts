import { InternalServerError } from "@buxlo/common";
import {
  ISubscriptionPlanData,
  IUpdateSubscriptionPlanUseCase,
} from "../../interface/admin/IUpdateSubscriptionPlanUseCase";
import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import {
  SubscriptionMapper,
  SubscriptionResponseDto,
} from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";

export class UpdateSubscriptionPlanUseCase
  implements IUpdateSubscriptionPlanUseCase
{
  constructor(private _subscriptionPlanRepository: IsubscriptionRepository) {}
  async execute(
    id: string,
    updatedData: ISubscriptionPlanData
  ): Promise<SubscriptionResponseDto> {
    try {
      const data = await this._subscriptionPlanRepository.update(
        id,
        updatedData
      );

      return SubscriptionMapper.toDto(data);
    } catch (error) {
      console.error(error);
      throw new InternalServerError();
    }
  }
}
