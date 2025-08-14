import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { WebHookController } from "../controllers/webHook/weebHookController";

export class WebHookRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _webHookController!: WebHookController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._webHookController = new WebHookController(
      this._diContainer.webHookUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.post("/webhook", this._webHookController.webHook);
  }

  public getRouter(): Router {
    return this._router;
  }
}
