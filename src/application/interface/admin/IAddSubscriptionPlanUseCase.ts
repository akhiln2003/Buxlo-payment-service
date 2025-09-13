import { SubscriptionResponseDto } from "../../dto/subscriptionResponse.dto";

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
