import { SubscriptionRepository } from "../repositories/subscriptionRepositary";
import { UpdateSubscriptionPlanUseCase } from "../../application/usecase/admin/updateSubscriptionPlanUseCase";
import { IfetchSubscriptionPlanUseCase } from "../../application/interface/common/IfetchSubscriptionPlanUseCase";
import { FetchSubscriptionPlanUseCase } from "../../application/usecase/common/fetchSubscriptionPlanUseCase";
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
import { IcreateBookingCheckoutSessionUseCase } from "../../application/interface/common/IcreateCheckoutSessionUseCase";
import { CreateBookingCheckoutSessionUseCase } from "../../application/usecase/common/createBookingCheckoutSessionUseCase";
import { StripeService } from "../external-services/stripe/stripeService";
import { BookingPaymentRepository } from "../repositories/bookingPaymentRepositary";
import { WebHookUseCase } from "../../application/usecase/webHook/webHookUseCase";
import { IwebHookUseCase } from "../../application/interface/webHook/IwebHookUseCase";
import { stripe } from "../external-services/stripe/stripe.config";
import { TypeORMUnitOfWork } from "../repositories/typeORMUnitOfWork";
import { IfetchOnePaymentUseCase } from "../../application/interface/common/IfetchOnePaymentUseCase";
import { FetchOnePaymentUseCase } from "../../application/usecase/common/fetchOnePaymentUseCase";
import { SubscriptionPaymentRepository } from "../repositories/subscriptionPaymentRepository";
import { CreateSubscriptionCheckoutSessionUseCase } from "../../application/usecase/common/createSubscriptionCheckoutSessionUseCase";
import { IcreateSubscriptionCheckoutSessionUseCase } from "../../application/interface/common/IcreateSubscriptionCheckoutSessionUseCase";

export class DIContainer {
  private _subscriptionPlanRepository: SubscriptionRepository;
  private _walletRepository: WalletRepository;
  private _stripeService: StripeService;
  private _bookngPaymentRepository: BookingPaymentRepository;
  private _subscriptionPaymentRepository: SubscriptionPaymentRepository;
  private _typeORMUnitOfWork: TypeORMUnitOfWork;

  constructor() {
    this._subscriptionPlanRepository = new SubscriptionRepository();
    this._walletRepository = new WalletRepository();
    this._stripeService = new StripeService();
    this._bookngPaymentRepository = new BookingPaymentRepository();
    this._subscriptionPaymentRepository = new SubscriptionPaymentRepository();
    this._typeORMUnitOfWork = new TypeORMUnitOfWork();
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

  createBookingCheckoutSessionUseCase(): IcreateBookingCheckoutSessionUseCase {
    return new CreateBookingCheckoutSessionUseCase(
      this._stripeService,
      this._bookngPaymentRepository
    );
  }
  createSubscriptionCheckoutSessionUseCase(): IcreateSubscriptionCheckoutSessionUseCase {
    return new CreateSubscriptionCheckoutSessionUseCase(
      this._stripeService,
      this._subscriptionPaymentRepository,
      this._walletRepository
    );
  }

  webHookUseCase(): IwebHookUseCase {
    return new WebHookUseCase(stripe, this._bookngPaymentRepository);
  }

  fetchOnePaymentUseCase(): IfetchOnePaymentUseCase {
    return new FetchOnePaymentUseCase(this._bookngPaymentRepository);
  }
}
