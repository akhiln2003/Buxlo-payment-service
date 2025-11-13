import { InternalServerError } from "@buxlo/common";
import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import {
  SubscriptionMapper,
  SubscriptionResponseDto,
} from "../../dto/subscriptionResponse.dto";
import { IDeleteSubscriptionPlanUseCase } from "../../interface/admin/IDeleteSubscriptionPlanUseCase";

export class DeleteSubscriptionPlanUseCase
  implements IDeleteSubscriptionPlanUseCase
{
  constructor(private _subscriptionPlanRepository: IsubscriptionRepository) {}
  async execute(id: string): Promise<SubscriptionResponseDto> {
    try {
      const data = await this._subscriptionPlanRepository.delete(id);
      return SubscriptionMapper.toDto(data);
    } catch (error) {
      console.error(error);
      throw new InternalServerError();
    }
  }
}
