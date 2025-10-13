import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { ICreateBookingCheckoutSessionUseCase } from "../../../application/interface/common/ICreateCheckoutSessionUseCase";

export class CreateCheckoutSessionController {
  constructor(
    private _createCheckoutSessionUseCase: ICreateBookingCheckoutSessionUseCase
  ) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = await this._createCheckoutSessionUseCase.execute(
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
