import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IcreateSubscriptionCheckoutSessionUseCase } from "../../../application/interface/common/IcreateSubscriptionCheckoutSessionUseCase";

export class CreateSubscriptionCheckoutSessionController {
  constructor(
    public createCheckoutSessionUseCase: IcreateSubscriptionCheckoutSessionUseCase
  ) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = await this.createCheckoutSessionUseCase.execute(
        req.body,
        req.params.userId,
        req.params.type as "booking" | "subscription"
      );
      res.status(HttpStatusCode.OK).json({ url });
    } catch (error) {
      next(error);
    }
  };
}
