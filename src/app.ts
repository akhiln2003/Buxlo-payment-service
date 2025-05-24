import { errorHandler } from "@buxlo/common";
import loggerMiddleware from "./presentation/middlewares/loggerMiddleware";
import { Iserver } from "./domain/interfaces/Iserver";
import { AdminRouter } from "./presentation/routes/adminRouts";
import { CommonRouter } from "./presentation/routes/commonRouts";
import { connectDB, disconnectDB } from "./infrastructure/database/sql/connection";

export class App {
  constructor(private server: Iserver) {}

  async initialize(): Promise<void> {
    this.registerMiddleware();
    this.registerRoutes();
    this.registerErrorHandler();
    await this.connectDB();
  }

  private registerMiddleware(): void {
    this.server.registerMiddleware(loggerMiddleware);
  }
  private registerRoutes(): void {
    const adminRoutes = new AdminRouter().getRouter();
    const commonRoutes = new CommonRouter().getRouter();

    this.server.registerRoutes("/api/payment/admin", adminRoutes);
    this.server.registerRoutes("/api/payment/common", commonRoutes);
  }

  private registerErrorHandler(): void {
    this.server.registerErrorHandler(errorHandler as any);
  }

  async start(port: number): Promise<void> {
    await this.server.start(port);
  }

  async shutdown(): Promise<void> {
    await disconnectDB();
    console.log("Shut dow server");
  }
  private async connectDB() {
    try {
      await connectDB();
    } catch (error) {
      console.log("Server could not be started", error);
      process.exit(1);
    }
  }
}
