import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { UpdateSubscriptionPlanController } from "../controllers/admin/updateSubscriptionPlan.controller";
import { AddSubscriptionPlanController } from "../controllers/admin/addSubscriptionPlan.controller";
import { FetchIncomeSummeryController } from "../controllers/admin/fetchIncomeSummery.controller";
import { validateReqParams } from "@buxlo/common";
import { deleteSubscriptionPlanDto,  } from "../dto/admin/deletesubScriptionplan.dto";
import { DeleteSubscriptionPlanController } from "../controllers/admin/deleteSubscriptionPlan.controller";

export class AdminRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _addSubscriptionPlanController!: AddSubscriptionPlanController;
  private _updateSubscriptionPlanController!: UpdateSubscriptionPlanController;
  private _fetchIncomeSummeryController!: FetchIncomeSummeryController;
  private _deleteSubscriptionPlanController!: DeleteSubscriptionPlanController;
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
    this._deleteSubscriptionPlanController =
      new DeleteSubscriptionPlanController(
        this._diContainer.deleteSubscriptionPlanUseCase()
      );
    this._fetchIncomeSummeryController = new FetchIncomeSummeryController(
      this._diContainer.fetchIncomeSummeryUseCase()
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
    this._router.delete(
      "/deletesubscriptionplan/:id",
      validateReqParams(deleteSubscriptionPlanDto),
      this._deleteSubscriptionPlanController.delete
    );
    this._router.get(
      "/fetchincomsummery",
      this._fetchIncomeSummeryController.fetch
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
