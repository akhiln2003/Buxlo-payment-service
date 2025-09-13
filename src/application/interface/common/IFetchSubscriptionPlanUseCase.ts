import { SubscriptionResponseDto } from "../../dto/subscriptionResponse.dto";

export interface IFetchSubscriptionPlanUseCase {
  execute(): Promise<SubscriptionResponseDto[]>;
}
