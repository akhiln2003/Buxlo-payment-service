import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { UpdateSubscriptionPlanController } from "../controllers/admin/updateSubscriptionPlanController";
import { AddSubscriptionPlanController } from "../controllers/admin/addSubscriptionPlanController";

export class AdminRouter {
  private router: Router;
  private diContainer: DIContainer;

  private addSubscriptionPlanController!: AddSubscriptionPlanController;
  private updateSubscriptionPlanController!: UpdateSubscriptionPlanController;

  constructor() {
    this.router = Router();
    this.diContainer = new DIContainer();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeControllers(): void {
  

    this.updateSubscriptionPlanController =
      new UpdateSubscriptionPlanController(
        this.diContainer.updateSubscriptionPlanUseCase()
      );

    this.addSubscriptionPlanController = new AddSubscriptionPlanController(
      this.diContainer.addSubscriptionPlanUseCase()
    );
  }

  private initializeRoutes(): void {
    this.router.post(
      "/addsubscriptionplan",
      this.addSubscriptionPlanController.create
    );
    this.router.put(
      "/updatesubscriptionplan",
      this.updateSubscriptionPlanController.update
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
