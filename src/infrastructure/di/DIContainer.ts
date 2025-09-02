import { SubscriptionRepository } from "../repositories/subscriptionRepositary";
import { UpdateSubscriptionPlanUseCase } from "../../application/usecase/admin/updateSubscriptionPlanUseCase";
import { IFetchSubscriptionPlanUseCase } from "../../application/interface/common/IFetchSubscriptionPlanUseCase";
import { FetchSubscriptionPlanUseCase } from "../../application/usecase/common/fetchSubscriptionPlanUseCase";
import { AddSubscriptionPlanUseCase } from "../../application/usecase/admin/addSubscriptionPlanUseCase";
import { IAddSubscriptionPlanUseCase } from "../../application/interface/admin/IAddSubscriptionPlanUseCase";
import { FetchWalletUseCase } from "../../application/usecase/common/fetchWalletUseCase";
import { IFetchWalletUseCase } from "../../application/interface/common/IFetchWalletUseCase";
import { WalletRepository } from "../repositories/walletRepositary";
import { IUpdateSubscriptionPlanUseCase } from "../../application/interface/admin/IUpdateSubscriptionPlanUseCase";
import { ICreateWalletUseCase } from "../../application/interface/common/ICreateWalletUseCase";
import { CreateWalletUseCase } from "../../application/usecase/common/createWalletUseCase";
import { IUpdateWalletUseCase } from "../../application/interface/common/IUpdateWalletUseCase";
import { UpdateWalletUseCase } from "../../application/usecase/common/UpdateWalletUseCase";
import { ICreateBookingCheckoutSessionUseCase } from "../../application/interface/common/ICreateCheckoutSessionUseCase";
import { CreateBookingCheckoutSessionUseCase } from "../../application/usecase/common/createBookingCheckoutSessionUseCase";
import { StripeService } from "../external-services/stripe/stripeService";
import { BookingPaymentRepository } from "../repositories/bookingPaymentRepositary";
import { WebHookUseCase } from "../../application/usecase/webHook/webHookUseCase";
import { IWebHookUseCase } from "../../application/interface/webHook/IWebHookUseCase";
import { stripe } from "../external-services/stripe/stripe.config";
import { TypeORMUnitOfWork } from "../repositories/typeORMUnitOfWork";
import { IFetchOnePaymentUseCase } from "../../application/interface/common/IFetchOnePaymentUseCase";
import { FetchOnePaymentUseCase } from "../../application/usecase/common/fetchOnePaymentUseCase";
import { SubscriptionPaymentRepository } from "../repositories/subscriptionPaymentRepository";
import { CreateSubscriptionCheckoutSessionUseCase } from "../../application/usecase/common/createSubscriptionCheckoutSessionUseCase";
import { ICreateSubscriptionCheckoutSessionUseCase } from "../../application/interface/common/ICreateSubscriptionCheckoutSessionUseCase";
import { IUpdateBookingPaymetUseCase } from "../../application/interface/common/IUpdateBookingPaymetUseCase";
import { IUpdateSubscriptionPaymetUseCase } from "../../application/interface/common/IUpdateSubscriptionPaymetUseCase";
import { UpdateBookingPaymetUseCase } from "../../application/usecase/common/updateBookingPaymetUseCase";
import { UpdateSubscriptionPaymetUseCase } from "../../application/usecase/common/updateSubscriptionPaymetUseCase";
import { IFetchSubscriptionPlanByIdUseCase } from "../../application/interface/common/IFetchSubscriptionPlanByIdUseCase";
import { FetchSubscriptionPlanByIdUseCase } from "../../application/usecase/common/fetchSubscriptionPlanByIdUseCase";

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

  fetchSubscriptionPlanUseCase(): IFetchSubscriptionPlanUseCase {
    return new FetchSubscriptionPlanUseCase(this._subscriptionPlanRepository);
  }

  fetchSubscriptionPlanByIdUseCase(): IFetchSubscriptionPlanByIdUseCase {
    return new FetchSubscriptionPlanByIdUseCase(
      this._subscriptionPlanRepository
    );
  }

  addSubscriptionPlanUseCase(): IAddSubscriptionPlanUseCase {
    return new AddSubscriptionPlanUseCase(this._subscriptionPlanRepository);
  }

  updateSubscriptionPlanUseCase(): IUpdateSubscriptionPlanUseCase {
    return new UpdateSubscriptionPlanUseCase(this._subscriptionPlanRepository);
  }

  createWalletUseCase(): ICreateWalletUseCase {
    return new CreateWalletUseCase(this._walletRepository);
  }

  fetchWalletUseCase(): IFetchWalletUseCase {
    return new FetchWalletUseCase(this._walletRepository);
  }

  updateWalletUseCase(): IUpdateWalletUseCase {
    return new UpdateWalletUseCase(this._walletRepository);
  }

  createBookingCheckoutSessionUseCase(): ICreateBookingCheckoutSessionUseCase {
    return new CreateBookingCheckoutSessionUseCase(
      this._stripeService,
      this._bookngPaymentRepository
    );
  }
  createSubscriptionCheckoutSessionUseCase(): ICreateSubscriptionCheckoutSessionUseCase {
    return new CreateSubscriptionCheckoutSessionUseCase(
      this._stripeService,
      this._subscriptionPaymentRepository,
      this._walletRepository
    );
  }

  webHookUseCase(): IWebHookUseCase {
    return new WebHookUseCase(
      stripe,
      this._bookngPaymentRepository,
      this._subscriptionPaymentRepository,
      this._subscriptionPlanRepository
    );
  }

  fetchOnePaymentUseCase(): IFetchOnePaymentUseCase {
    return new FetchOnePaymentUseCase(this._bookngPaymentRepository);
  }

  updateBookingPaymetUseCase(): IUpdateBookingPaymetUseCase {
    return new UpdateBookingPaymetUseCase(this._bookngPaymentRepository);
  }
  updateSubscriptionPaymetUseCase(): IUpdateSubscriptionPaymetUseCase {
    return new UpdateSubscriptionPaymetUseCase(
      this._subscriptionPaymentRepository
    );
  }
}
