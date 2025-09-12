import { InternalServerError } from "@buxlo/common";
import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import {
  IAddSubscriptionPlanUseCase,
  IAddSubscriptionPlanUseCaseProps,
} from "../../interface/admin/IAddSubscriptionPlanUseCase";
import {
  SubscriptionMapper,
  SubscriptionResponseDto,
} from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";

export class AddSubscriptionPlanUseCase implements IAddSubscriptionPlanUseCase {
  constructor(private _subscriptionRepository: IsubscriptionRepository) {}

  async execute(
    data: IAddSubscriptionPlanUseCaseProps[]
  ): Promise<SubscriptionResponseDto[]> {
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
