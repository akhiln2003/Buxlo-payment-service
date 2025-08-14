import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchWalletController } from "../controllers/common/fetchWalletController";
import { UpdateWalletController } from "../controllers/common/updateWalletController";
import { CreateWalletController } from "../controllers/common/createWalletController";
import { FetchSubscriptionPlanController } from "../controllers/common/fetchSubscriptionPlanController";
import { CreateCheckoutSessionController } from "../controllers/common/createBookingCheckoutSessionController";
import { validateReqBody, validateReqParams } from "@buxlo/common";
import {
  createCheckoutSessionBodyDto,
  createCheckoutSessionParamsDto,
} from "../../zodSchemaDto/common/createCheckoutSession.dto";
import { fetchOnePaymentDto } from "../../zodSchemaDto/common/fetchOnePaymet.dto";
import { FetchOnePaymentController } from "../controllers/common/fetchOnePaymentController";
import { CreateSubscriptionCheckoutSessionController } from "../controllers/common/createSubscriptonCheckoutSessionController";

export class CommonRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _createWalletController!: CreateWalletController;
  private _fetchWalletController!: FetchWalletController;
  private _updateWalletController!: UpdateWalletController;
  private _fetchSubscriptionPlanController!: FetchSubscriptionPlanController;
  private _createCheckoutSessionController!: CreateCheckoutSessionController;
  private _createSubscriptonCheckoutSessionController!: CreateSubscriptionCheckoutSessionController;
  private _fetchOnePaymetController!: FetchOnePaymentController;

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
  }

  public getRouter(): Router {
    return this._router;
  }
}
