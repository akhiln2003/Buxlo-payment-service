import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchWalletController } from "../controllers/common/fetchWalletController";
import { UpdateWalletController } from "../controllers/common/updateWalletController";

export class CommonRouter {
  private router: Router;
  private diContainer: DIContainer;

  private fetchWalletController!: FetchWalletController;
  private updateWalletController!: UpdateWalletController;

  constructor() {
    this.router = Router();
    this.diContainer = new DIContainer();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeControllers(): void {
    this.fetchWalletController = new FetchWalletController(
      this.diContainer.fetchWalletUseCase()
    );
    this.updateWalletController = new UpdateWalletController(
      this.diContainer.updateWalletUseCase()
    );
  }

  private initializeRoutes(): void {
    this.router.get("/fetchwallet", this.fetchWalletController.fetch);
    this.router.patch("/updatewalletname/:id", this.updateWalletController.update);
  }

  public getRouter(): Router {
    return this.router;
  }
}
