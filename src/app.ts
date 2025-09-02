import { errorHandler } from "@buxlo/common";
import loggerMiddleware from "./presentation/middlewares/loggerMiddleware";
import { IServer } from "./domain/interfaces/IServer";
import { AdminRouter } from "./presentation/routes/adminRouts";
import { CommonRouter } from "./presentation/routes/commonRouts";
import {
  connectDB,
  disconnectDB,
} from "./infrastructure/database/sql/connection";
import { messageBroker } from "./infrastructure/MessageBroker/config";

export class App {
  constructor(private _server: IServer) {}

  async initialize(): Promise<void> {
    await this.connectKafka();
    await this._connectDB();
    this._registerMiddleware();
    this._registerRoutes();
    this._registerErrorHandler();
  }

  private _registerMiddleware(): void {
    this._server.registerMiddleware(loggerMiddleware);
  }
  private _registerRoutes(): void {
    const adminRoutes = new AdminRouter().getRouter();
    const commonRoutes = new CommonRouter().getRouter();

    this._server.registerRoutes("/api/payment/admin", adminRoutes);
    this._server.registerRoutes("/api/payment/common", commonRoutes);
  }

  private _registerErrorHandler(): void {
    this._server.registerErrorHandler(errorHandler as any);
  }

  async start(port: number): Promise<void> {
    await this._server.start(port);
  }

  async _shutdown(): Promise<void> {
    await disconnectDB();
    await messageBroker.disconnect();
    console.log("Shut dow server");
  }
  private async _connectDB() {
    try {
      await connectDB();
    } catch (error) {
      console.log("Server could not be started", error);
      process.exit(1);
    }
  }

  private async connectKafka(): Promise<void> {
    await messageBroker.connect();
  }
}
