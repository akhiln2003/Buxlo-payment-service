import { SubscriptionResponseDto } from "../../dto/subscriptionResponse.dto";

export interface IFetchSubscriptionPlanByIdUseCase {
  execute(id: string): Promise<SubscriptionResponseDto>;
}
