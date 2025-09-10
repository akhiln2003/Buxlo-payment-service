import { SubscriptionResponseDto } from "../../../domain/zodSchemaDto/output/subscriptionResponse.dto";

export interface IAddSubscriptionPlanUseCaseProps {
  price: number;
  offer: number;
  type: string;
}
export interface IAddSubscriptionPlanUseCase {
  execute(
    data: IAddSubscriptionPlanUseCaseProps[]
  ): Promise<SubscriptionResponseDto[]>;
}
