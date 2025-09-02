import { SubscriptionResponseDto } from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";

export interface ISubscriptionPlanData {
  offer: number;
}

export interface IUpdateSubscriptionPlanUseCase {
  execute(
    id: string,
    updatedData: ISubscriptionPlanData
  ): Promise<SubscriptionResponseDto>;
}
