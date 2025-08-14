import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IwebHookUseCase } from "../../../application/interface/webHook/IwebHookUseCase";

export class WebHookController {
  constructor(private _webHookUseCase: IwebHookUseCase) {}
  webHook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sig = req.headers["stripe-signature"];
      const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET!;
      const updateData = await this._webHookUseCase.execute(
        req.body,
        sig,
        stripeSecret
      );
      res.status(HttpStatusCode.OK).json({ updateData });
    } catch (error) {
      next(error);
    }
  };
}
