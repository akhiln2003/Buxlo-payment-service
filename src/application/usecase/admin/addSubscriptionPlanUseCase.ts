import { InternalServerError } from "@buxlo/common";
import { Subscription } from "../../../domain/entities/subscription";
import { IsubscriptionRepository } from "../../../domain/interfaces/IsubscriptionRepository";
import { IaddSubscriptionPlanUseCase } from "../../interface/admin/IaddSubscriptionPlanUseCase";

export class AddSubscriptionPlanUseCase implements IaddSubscriptionPlanUseCase {
  constructor(private subscriptionRepository: IsubscriptionRepository) {}

  async execute(data: Subscription[]): Promise<Subscription[] | null> {
    try {
      const createdSubscriptions = await Promise.all(
        data.map((item) => this.subscriptionRepository.create(item))
      );
      return createdSubscriptions;
    } catch (error) {
      console.error("Error from AddSubscriptionPlanUseCase ", error);
      throw new InternalServerError();
    }
  }
}
