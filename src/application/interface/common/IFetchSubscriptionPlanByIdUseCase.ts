import { SubscriptionResponseDto } from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";

export interface IFetchSubscriptionPlanByIdUseCase {
  execute(id:string): Promise<SubscriptionResponseDto>;
}
