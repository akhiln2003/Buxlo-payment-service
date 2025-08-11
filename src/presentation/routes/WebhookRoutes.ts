import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { WebHookController } from "../controllers/webHook/weebHookController";

export class WebHookRouter {
  private router: Router;
  private diContainer: DIContainer;

  private webHookController!: WebHookController;

  constructor() {
    this.router = Router();
    this.diContainer = new DIContainer();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeControllers(): void {
    this.webHookController = new WebHookController(
      this.diContainer.webHookUseCase()
    );
  }

  private initializeRoutes(): void {
    this.router.post("/webhook", this.webHookController.webHook);
  }

  public getRouter(): Router {
    return this.router;
  }
}
