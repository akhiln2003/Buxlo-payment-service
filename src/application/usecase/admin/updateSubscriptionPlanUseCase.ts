import { InternalServerError } from "@buxlo/common";
import {
  IsubscriptionPlanData,
  IupdateSubscriptionPlanUseCase,
} from "../../interface/admin/updateSubscriptionPlanUseCase";
import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import { SubscriptionResponseDto } from "../../../zodSchemaDto/output/subscriptionResponse.dto";

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

      return data;
    } catch (error) {
      console.error(error);
      throw new InternalServerError();
    }
  }
}
