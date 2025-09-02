import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { ICreateSubscriptionCheckoutSessionUseCase } from "../../../application/interface/common/ICreateSubscriptionCheckoutSessionUseCase";

export class CreateSubscriptionCheckoutSessionController {
  constructor(
    public createCheckoutSessionUseCase: ICreateSubscriptionCheckoutSessionUseCase
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
