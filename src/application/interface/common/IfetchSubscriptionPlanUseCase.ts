import { SubscriptionResponseDto } from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";

export interface IfetchSubscriptionPlanUseCase {
  execute(): Promise<SubscriptionResponseDto[]>;
}
