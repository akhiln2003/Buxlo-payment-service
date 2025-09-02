import { InternalServerError } from "@buxlo/common";
import { Subscription } from "../../../domain/entities/subscription";
import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import { IaddSubscriptionPlanUseCase } from "../../interface/admin/IaddSubscriptionPlanUseCase";
import {
  SubscriptionMapper,
  SubscriptionResponseDto,
} from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";

export class AddSubscriptionPlanUseCase implements IaddSubscriptionPlanUseCase {
  constructor(private _subscriptionRepository: IsubscriptionRepository) {}

  async execute(data: Subscription[]): Promise<SubscriptionResponseDto[]> {
    try {
      const createdSubscriptions = await Promise.all(
        data.map((item) => this._subscriptionRepository.create(item))
      );
      return createdSubscriptions.map((sub) => SubscriptionMapper.toDto(sub));
    } catch (error) {
      console.error("Error from AddSubscriptionPlanUseCase ", error);
      throw new InternalServerError();
    }
  }
}
