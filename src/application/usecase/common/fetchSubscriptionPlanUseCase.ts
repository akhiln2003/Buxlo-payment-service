import { Subscription } from "../../../domain/entities/subscription";
import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import { IfetchSubscriptionPlanUseCase } from "../../interface/common/IfetchSubscriptionPlanUseCase";

export class FetchSubscriptionPlanUseCase implements IfetchSubscriptionPlanUseCase {
  constructor(private subscriptionRepository: IsubscriptionRepository) {}

  async execute(): Promise<Subscription[] | null> {
    return await this.subscriptionRepository.getSubscriptionDetails();
  }
}
