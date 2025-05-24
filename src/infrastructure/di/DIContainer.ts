import { SubscriptionRepository } from "../repositories/subscriptionRepositary";
import { UpdateSubscriptionPlanUseCase } from "../../application/usecase/admin/updateSubscriptionPlanUseCase";
import { IfetchSubscriptionPlanUseCase } from "../../application/interface/admin/IfetchSubscriptionPlanUseCase";
import { FetchSubscriptionPlanUseCase } from "../../application/usecase/admin/fetchSubscriptionPlanUseCase";
import { AddSubscriptionPlanUseCase } from "../../application/usecase/admin/addSubscriptionPlanUseCase";
import { IaddSubscriptionPlanUseCase } from "../../application/interface/admin/IaddSubscriptionPlanUseCase";

export class DIContainer {
  private _subscriptionPlanRepository: SubscriptionRepository;
  // private _walletRepository: WalletRepository;

  constructor() {
    this._subscriptionPlanRepository = new SubscriptionRepository();
    // this._walletRepository = new WalletRepository();
  }

  fetchSubscriptionPlanUseCase(): IfetchSubscriptionPlanUseCase {
    return new FetchSubscriptionPlanUseCase(this._subscriptionPlanRepository);
  }

  addSubscriptionPlanUseCase(): IaddSubscriptionPlanUseCase {
    return new AddSubscriptionPlanUseCase(this._subscriptionPlanRepository);
  }

  updateSubscriptionPlanUseCase() {
    return new UpdateSubscriptionPlanUseCase(this._subscriptionPlanRepository);
  }

  // fetchWalletUseCase():IfetchWalletUseCase{
  //   return new FetchWalletUseCase(this._walletRepository);
  // }
}
