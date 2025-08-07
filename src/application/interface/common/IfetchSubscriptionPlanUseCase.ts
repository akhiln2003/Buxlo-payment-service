import { Subscription } from "../../../domain/entities/subscription";

export interface IfetchSubscriptionPlanUseCase{
    execute(): Promise<Subscription[]| null>;
  }