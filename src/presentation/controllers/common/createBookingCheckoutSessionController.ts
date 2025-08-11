import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IcreateBookingCheckoutSessionUseCase } from "../../../application/interface/common/IcreateCheckoutSessionUseCase";

export class CreateCheckoutSessionController {
  constructor(
    public createCheckoutSessionUseCase: IcreateBookingCheckoutSessionUseCase
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
