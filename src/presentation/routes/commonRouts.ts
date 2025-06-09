import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchWalletController } from "../controllers/common/fetchWalletController";
import { UpdateWalletController } from "../controllers/common/updateWalletController";
import { CreateWalletController } from "../controllers/common/createWalletController";

export class CommonRouter {
  private router: Router;
  private diContainer: DIContainer;

  private createWalletController!: CreateWalletController;
  private fetchWalletController!: FetchWalletController;
  private updateWalletController!: UpdateWalletController;

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
  }

  private initializeRoutes(): void {
    this.router.post("/createwallet", this.createWalletController.create);
    this.router.get("/fetchwallet", this.fetchWalletController.fetch);
    this.router.patch(
      "/updatewalletname/:id",
      this.updateWalletController.update
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
