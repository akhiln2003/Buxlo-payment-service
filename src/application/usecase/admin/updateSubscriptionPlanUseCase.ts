import { InternalServerError } from "@buxlo/common";
import {
  IsubscriptionPlanData,
  IupdateSubscriptionPlanUseCase,
} from "../../interface/admin/updateSubscriptionPlanUseCase";
import { Subscription } from "../../../domain/entities/subscription";
import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";

export class UpdateSubscriptionPlanUseCase
  implements IupdateSubscriptionPlanUseCase
{
  constructor(private _subscriptionPlanRepository: IsubscriptionRepository) {}
  async execute(
    id: string,
    updatedData: IsubscriptionPlanData
  ): Promise<any | Subscription> {
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
