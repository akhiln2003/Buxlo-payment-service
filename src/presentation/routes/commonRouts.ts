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
  private router: Router;
  private diContainer: DIContainer;

  private createWalletController!: CreateWalletController;
  private fetchWalletController!: FetchWalletController;
  private updateWalletController!: UpdateWalletController;
  private fetchSubscriptionPlanController!: FetchSubscriptionPlanController;
  private createCheckoutSessionController!: CreateCheckoutSessionController;
  private createSubscriptonCheckoutSessionController!: CreateSubscriptionCheckoutSessionController;
  private fetchOnePaymetController!: FetchOnePaymentController;

  constructor() {
    this.router = Router();
    this.diContainer = new DIContainer();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeControllers(): void {
    this.createWalletController = new CreateWalletController(
      this.diContainer.createWalletUseCase()
    );
    this.fetchWalletController = new FetchWalletController(
      this.diContainer.fetchWalletUseCase()
    );
    this.updateWalletController = new UpdateWalletController(
      this.diContainer.updateWalletUseCase()
    );
    this.fetchSubscriptionPlanController = new FetchSubscriptionPlanController(
      this.diContainer.fetchSubscriptionPlanUseCase()
    );

    this.createCheckoutSessionController = new CreateCheckoutSessionController(
      this.diContainer.createBookingCheckoutSessionUseCase()
    );
    this.createSubscriptonCheckoutSessionController =
      new CreateSubscriptionCheckoutSessionController(
        this.diContainer.createSubscriptionCheckoutSessionUseCase()
      );
    this.fetchOnePaymetController = new FetchOnePaymentController(
      this.diContainer.fetchOnePaymentUseCase()
    );
  }

  private initializeRoutes(): void {
    this.router.post("/createwallet", this.createWalletController.create);
    this.router.get("/fetchwallet", this.fetchWalletController.fetch);
    this.router.patch(
      "/updatewalletname/:id/:name",
      this.updateWalletController.update
    );
    this.router.get(
      "/fetchsubscriptionplan",
      this.fetchSubscriptionPlanController.fetchData
    );
    this.router.post(
      "/createbookingcheckoutsession/:userId/:type",
      validateReqParams(createCheckoutSessionParamsDto),
      validateReqBody(createCheckoutSessionBodyDto),
      this.createCheckoutSessionController.create
    );
    this.router.post(
      "/createsubscriptioncheckoutsession/:userId/:type",
      validateReqParams(createCheckoutSessionParamsDto),
      this.createSubscriptonCheckoutSessionController.create
    );
    this.router.get(
      "/fetchonepaymet/:id",
      validateReqParams(fetchOnePaymentDto),
      this.fetchOnePaymetController.fetch
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
