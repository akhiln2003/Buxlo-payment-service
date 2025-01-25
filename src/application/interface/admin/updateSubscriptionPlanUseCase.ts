import { Subscription } from "../../../domain/entities/subscription";

export interface IsubscriptionPlanData {
  offer:number
}

export interface IupdateSubscriptionPlanUseCase {
  execute(
    id: string,
    updatedData: IsubscriptionPlanData,
  ): Promise<any | Subscription>;
}
