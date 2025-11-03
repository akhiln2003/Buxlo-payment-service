import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchPaymentHistorySummaryController } from "../controllers/user/fetchPaymentHistorySummary.controller";

export class UserRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _fetchPaymentHistorySummaryController!: FetchPaymentHistorySummaryController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._fetchPaymentHistorySummaryController =
      new FetchPaymentHistorySummaryController(
        this._diContainer.fetchPaymentHistorySummaryUseCase()
      );
  }

  private _initializeRoutes(): void {
    this._router.get(
      "/fetchpaymethistorysummary",
      this._fetchPaymentHistorySummaryController.fetch
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
