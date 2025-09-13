import { SubscriptionResponseDto } from "../../dto/subscriptionResponse.dto";

export interface ISubscriptionPlanData {
  offer: number;
}

export interface IUpdateSubscriptionPlanUseCase {
  execute(
    id: string,
    updatedData: ISubscriptionPlanData
  ): Promise<SubscriptionResponseDto>;
}
