import { errorHandler } from "@buxlo/common";
import {
  connectDB,
  disconnectDB,
} from "./infrastructure/database/mongodb/connection";
import loggerMiddleware from "./presentation/middlewares/loggerMiddleware";
import { adminRoutes } from "./presentation/routes/adminRouts";
import { Iserver } from "./domain/interfaces/Iserver";

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
    this.server.registerRoutes("/api/subscription/admin", adminRoutes);
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
