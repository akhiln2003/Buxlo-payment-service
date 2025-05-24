import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
// import { GetWalletController } from "../controllers/common/getWalletController";

export class CommonRouter {
  private router: Router;
  private diContainer: DIContainer;

  // private getWalletController!: GetWalletController;

  constructor() {
    this.router = Router();
    this.diContainer = new DIContainer();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeControllers(): void {
    // this.getWalletController = new GetWalletController(
    //   this.diContainer.fetchWalletUseCase()
    // );
  }

  private initializeRoutes(): void {
    // this.router.post("/fetchwallet", this.getWalletController.fetch);
  }

  public getRouter(): Router {
    return this.router;
  }
}
