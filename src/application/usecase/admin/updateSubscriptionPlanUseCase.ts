import { InternalServerError } from "@buxlo/common";
import {
  IsubscriptionPlanData,
  IupdateSubscriptionPlanUseCase,
} from "../../interface/admin/updateSubscriptionPlanUseCase";
import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import {
  SubscriptionMapper,
  SubscriptionResponseDto,
} from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";

export class UpdateSubscriptionPlanUseCase
  implements IupdateSubscriptionPlanUseCase
{
  constructor(private _subscriptionPlanRepository: IsubscriptionRepository) {}
  async execute(
    id: string,
    updatedData: IsubscriptionPlanData
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
