import { SubscriptionResponseDto } from "../../zodSchemaDto/output/subscriptionResponse.dto";
import { Subscription } from "../entities/subscription";

export interface IsubscriptionRepository {
  create(data: Subscription): Promise<SubscriptionResponseDto>;
  update(
    id: string,
    data: Partial<Subscription>
  ): Promise<SubscriptionResponseDto>;
  getSubscriptionDetails(): Promise<SubscriptionResponseDto[]>;
}
