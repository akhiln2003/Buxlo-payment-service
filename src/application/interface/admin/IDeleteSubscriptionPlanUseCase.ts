import { SubscriptionResponseDto } from "../../dto/subscriptionResponse.dto";

export interface IDeleteSubscriptionPlanUseCase {
  execute(id: string): Promise<SubscriptionResponseDto>;
}
