import { SubscriptionResponseDto } from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";

export interface IsubscriptionPlanData {
  offer: number;
}

export interface IupdateSubscriptionPlanUseCase {
  execute(
    id: string,
    updatedData: IsubscriptionPlanData
  ): Promise<SubscriptionResponseDto>;
}
