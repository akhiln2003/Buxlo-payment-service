import { SubscriptionResponseDto } from "../../../zodSchemaDto/output/subscriptionResponse.dto";

export interface IfetchSubscriptionPlanUseCase {
  execute(): Promise<SubscriptionResponseDto[]>;
}
