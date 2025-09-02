import { SubscriptionResponseDto } from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";

export interface IfetchSubscriptionPlanByIdUseCase {
  execute(id:string): Promise<SubscriptionResponseDto>;
}
