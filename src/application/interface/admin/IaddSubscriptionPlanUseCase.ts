import { Subscription } from "../../../domain/entities/subscription";
import { SubscriptionResponseDto } from "../../../zodSchemaDto/output/subscriptionResponse.dto";

export interface IaddSubscriptionPlanUseCase {
  execute(data: Subscription[]): Promise<SubscriptionResponseDto[]>;
}
