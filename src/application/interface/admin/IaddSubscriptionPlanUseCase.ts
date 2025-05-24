import { Subscription } from "../../../domain/entities/subscription";

export interface IaddSubscriptionPlanUseCase{
    execute(data:Subscription[]): Promise<Subscription[]| null>;
  }