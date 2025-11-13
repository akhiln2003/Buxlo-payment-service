import { Application, RequestHandler, Router } from "express";
import { IServer } from "../../domain/interfaces/IServer";
import express from "express";
import cookieParser from "cookie-parser";
import { createServer, Server as HttpServer } from "http";
import { WebHookRouter } from "../../presentation/routes/Webhook.routes";

export class ExpressWebServer implements IServer {
  private _app: Application;
  private _server: HttpServer;

  constructor() {
    this._app = express();
    
    // ⚡ CRITICAL: Webhook route MUST be registered BEFORE any body parsers
    // This ensures the raw buffer is preserved for Stripe signature verification
    const webhookRouter = new WebHookRouter();
    this._app.use(
      "/api/payment/stripe/webhook",
      express.raw({ type: "application/json" }),
      (req, res, next) => {
        console.log("🚀 Stripe webhook received at Payment Service!");
        console.log("Headers:", req.headers);
        console.log("Body is Buffer:", Buffer.isBuffer(req.body));
        console.log("Body length:", req.body?.length);
        console.log("Stripe-Signature:", req.headers["stripe-signature"]);
        next();
      },
      webhookRouter.getRouter()
    );

    // ✅ Now apply regular body parsers for other routes
    this._app.use(cookieParser());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(express.json());

    this._server = createServer(this._app);
  }

  registerMiddleware(middleware: RequestHandler): void {
    this._app.use(middleware);
  }

  registerRoutes(path: string, router: Router): void {
    this._app.use(path, router);
  }

  registerErrorHandler(middleware: RequestHandler): void {
    this._app.use(middleware);
  }

  async start(port: number): Promise<void> {
    return new Promise((res) => {
      this._server.listen(port, () => {
        console.log(`App listening on port ===> http://localhost:${port}/`);
        res();
      });
    });
  }

  async close(): Promise<void> {
    if (this._server) {
      return new Promise((resolve, reject) => {
        this._server.close((err?: Error) => {
          if (err) {
            console.error("Error closing", err);
            return reject(err);
          }
          console.log("Server closed");
          resolve();
        });
      });
    }
  }
}