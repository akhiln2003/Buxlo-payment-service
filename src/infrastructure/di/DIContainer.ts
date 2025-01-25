import { SubscriptionRepository } from "../repositories/subscriptionRepositary";
import { UpdateSubscriptionPlanUseCase } from "../../application/usecase/admin/updateSubscriptionPlanUseCase";
import { IfetchSubscriptionPlanUseCase } from "../../application/interface/admin/IfetchSubscriptionPlanUseCase";
import { FetchSubscriptionPlanUseCase } from "../../application/usecase/admin/fetchSubscriptionPlanUseCase";

export class DIContainer {
  private _subscriptionPlanRepository: SubscriptionRepository;

  constructor() {
    this._subscriptionPlanRepository = new SubscriptionRepository();
  }

  fetchSubscriptionPlanUseCase(): IfetchSubscriptionPlanUseCase {
    return new FetchSubscriptionPlanUseCase(this._subscriptionPlanRepository);
  }

  updateSubscriptionPlanUseCase() {
    return new UpdateSubscriptionPlanUseCase(this._subscriptionPlanRepository);
  }
}
