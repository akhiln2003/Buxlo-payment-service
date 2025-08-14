import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { UpdateSubscriptionPlanController } from "../controllers/admin/updateSubscriptionPlanController";
import { AddSubscriptionPlanController } from "../controllers/admin/addSubscriptionPlanController";

export class AdminRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _addSubscriptionPlanController!: AddSubscriptionPlanController;
  private _updateSubscriptionPlanController!: UpdateSubscriptionPlanController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._updateSubscriptionPlanController =
      new UpdateSubscriptionPlanController(
        this._diContainer.updateSubscriptionPlanUseCase()
      );

    this._addSubscriptionPlanController = new AddSubscriptionPlanController(
      this._diContainer.addSubscriptionPlanUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.post(
      "/addsubscriptionplan",
      this._addSubscriptionPlanController.create
    );
    this._router.put(
      "/updatesubscriptionplan",
      this._updateSubscriptionPlanController.update
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
