import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchWalletController } from "../controllers/common/fetchWalletController";
import { UpdateWalletController } from "../controllers/common/updateWalletController";
import { CreateWalletController } from "../controllers/common/createWalletController";
import { FetchSubscriptionPlanController } from "../controllers/common/fetchSubscriptionPlanController";
import { CreateCheckoutSessionController } from "../controllers/common/createBookingCheckoutSessionController";
import { validateReqBody, validateReqParams } from "@buxlo/common";
import { FetchOnePaymentController } from "../controllers/common/fetchOnePaymentController";
import { CreateSubscriptionCheckoutSessionController } from "../controllers/common/createSubscriptonCheckoutSessionController";
import { UpdateBookingPaymetController } from "../controllers/common/updateBookingPaymetController";
import { UpdateSubscriptionPaymetController } from "../controllers/common/updateSubscriptionPaymetController";
import {
  createCheckoutSessionBodyDto,
  createCheckoutSessionParamsDto,
} from "../../domain/zodSchemaDto/input/common/createCheckoutSession.dto";
import { fetchOnePaymentDto } from "../../domain/zodSchemaDto/input/common/fetchOnePaymet.dto";
import { updatePaymentDto } from "../../domain/zodSchemaDto/input/common/updatepaymet.dto";
import { FetchSubscriptionPlanByIdController } from "../controllers/common/fetchSubscriptionPlanByIdController";
import { fetchSubscriptionplanByIdDto } from "../../domain/zodSchemaDto/input/common/fetchSubscriptionplanById.dto";

export class CommonRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _createWalletController!: CreateWalletController;
  private _fetchWalletController!: FetchWalletController;
  private _updateWalletController!: UpdateWalletController;
  private _fetchSubscriptionPlanController!: FetchSubscriptionPlanController;
  private _fetchSubscriptionPlanByIdController!: FetchSubscriptionPlanByIdController;
  private _createCheckoutSessionController!: CreateCheckoutSessionController;
  private _createSubscriptonCheckoutSessionController!: CreateSubscriptionCheckoutSessionController;
  private _fetchOnePaymetController!: FetchOnePaymentController;
  private _updateSubscriptionPaymetController!: UpdateSubscriptionPaymetController;
  private _updateBookingPaymetController!: UpdateBookingPaymetController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._createWalletController = new CreateWalletController(
      this._diContainer.createWalletUseCase()
    );
    this._fetchWalletController = new FetchWalletController(
      this._diContainer.fetchWalletUseCase()
    );
    this._updateWalletController = new UpdateWalletController(
      this._diContainer.updateWalletUseCase()
    );
    this._fetchSubscriptionPlanController = new FetchSubscriptionPlanController(
      this._diContainer.fetchSubscriptionPlanUseCase()
    );
    this._fetchSubscriptionPlanByIdController =
      new FetchSubscriptionPlanByIdController(
        this._diContainer.fetchSubscriptionPlanByIdUseCase()
      );

    this._createCheckoutSessionController = new CreateCheckoutSessionController(
      this._diContainer.createBookingCheckoutSessionUseCase()
    );
    this._createSubscriptonCheckoutSessionController =
      new CreateSubscriptionCheckoutSessionController(
        this._diContainer.createSubscriptionCheckoutSessionUseCase()
      );
    this._fetchOnePaymetController = new FetchOnePaymentController(
      this._diContainer.fetchOnePaymentUseCase()
    );

    this._updateSubscriptionPaymetController =
      new UpdateSubscriptionPaymetController(
        this._diContainer.updateSubscriptionPaymetUseCase()
      );
    this._updateBookingPaymetController = new UpdateBookingPaymetController(
      this._diContainer.updateBookingPaymetUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.post("/createwallet", this._createWalletController.create);
    this._router.get("/fetchwallet", this._fetchWalletController.fetch);
    this._router.patch(
      "/updatewalletname/:id/:name",
      this._updateWalletController.update
    );
    this._router.get(
      "/fetchsubscriptionplan",
      this._fetchSubscriptionPlanController.fetchData
    );
    this._router.get(
      "/fetchsubscriptionplanbyid/:id",
      validateReqParams(fetchSubscriptionplanByIdDto),
      this._fetchSubscriptionPlanByIdController.fetchData
    );
    this._router.post(
      "/createbookingcheckoutsession/:userId/:type",
      validateReqParams(createCheckoutSessionParamsDto),
      validateReqBody(createCheckoutSessionBodyDto),
      this._createCheckoutSessionController.create
    );
    this._router.post(
      "/createsubscriptioncheckoutsession/:userId/:type",
      validateReqParams(createCheckoutSessionParamsDto),
      this._createSubscriptonCheckoutSessionController.create
    );
    this._router.get(
      "/fetchonepaymet/:id",
      validateReqParams(fetchOnePaymentDto),
      this._fetchOnePaymetController.fetch
    );

    this._router.post(
      "/updatesubscriptionpaymet/:id",
      validateReqParams(updatePaymentDto),
      this._updateSubscriptionPaymetController.update
    );
    this._router.post(
      "/updatesubbookingpaymet/:id",
      validateReqParams(updatePaymentDto),
      this._updateBookingPaymetController.update
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
