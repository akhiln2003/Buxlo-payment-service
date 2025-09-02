import { SubscriptionResponseDto } from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";

export interface IFetchSubscriptionPlanUseCase {
  execute(): Promise<SubscriptionResponseDto[]>;
}
