import { Subscription } from "../../../domain/entities/subscription";
import { SubscriptionResponseDto } from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";

export interface IaddSubscriptionPlanUseCase {
  execute(data: Subscription[]): Promise<SubscriptionResponseDto[]>;
}
