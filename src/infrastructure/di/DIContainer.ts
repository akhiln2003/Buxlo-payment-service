import { SubscriptionRepository } from "../repositories/subscriptionRepositary";
import { UpdateSubscriptionPlanUseCase } from "../../application/usecase/admin/updateSubscriptionPlanUseCase";
import { IfetchSubscriptionPlanUseCase } from "../../application/interface/admin/IfetchSubscriptionPlanUseCase";
import { FetchSubscriptionPlanUseCase } from "../../application/usecase/admin/fetchSubscriptionPlanUseCase";
import { AddSubscriptionPlanUseCase } from "../../application/usecase/admin/addSubscriptionPlanUseCase";
import { IaddSubscriptionPlanUseCase } from "../../application/interface/admin/IaddSubscriptionPlanUseCase";
import { FetchWalletUseCase } from "../../application/usecase/common/fetchWalletUseCase";
import { IfetchWalletUseCase } from "../../application/interface/common/IfetchWalletUseCase";
import { WalletRepository } from "../repositories/walletRepositary";
import { IupdateSubscriptionPlanUseCase } from "../../application/interface/admin/updateSubscriptionPlanUseCase";
import { IcreateWalletUseCase } from "../../application/interface/common/IcreateWalletUseCase";
import { CreateWalletUseCase } from "../../application/usecase/common/createWalletUseCase";
import { IupdateWalletUseCase } from "../../application/interface/common/IupdateWalletUseCase";
import { UpdateWalletUseCase } from "../../application/usecase/common/UpdateWalletUseCase";

export class DIContainer {
  private _subscriptionPlanRepository: SubscriptionRepository;
  private _walletRepository: WalletRepository;

  constructor() {
    this._subscriptionPlanRepository = new SubscriptionRepository();
    this._walletRepository = new WalletRepository();
  }

  fetchSubscriptionPlanUseCase(): IfetchSubscriptionPlanUseCase {
    return new FetchSubscriptionPlanUseCase(this._subscriptionPlanRepository);
  }

  addSubscriptionPlanUseCase(): IaddSubscriptionPlanUseCase {
    return new AddSubscriptionPlanUseCase(this._subscriptionPlanRepository);
  }

  updateSubscriptionPlanUseCase(): IupdateSubscriptionPlanUseCase {
    return new UpdateSubscriptionPlanUseCase(this._subscriptionPlanRepository);
  }

  createWalletUseCase(): IcreateWalletUseCase {
    return new CreateWalletUseCase(this._walletRepository);
  }

  fetchWalletUseCase(): IfetchWalletUseCase {
    return new FetchWalletUseCase(this._walletRepository);
  }

  updateWalletUseCase(): IupdateWalletUseCase {
    return new UpdateWalletUseCase(this._walletRepository);
  }
}
