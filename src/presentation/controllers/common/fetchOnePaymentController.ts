import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IfetchOnePaymentUseCase } from "../../../application/interface/common/IfetchOnePaymentUseCase";

export class FetchOnePaymentController {
  constructor(public fetchOnePaymentUseCase: IfetchOnePaymentUseCase) {}
  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await this.fetchOnePaymentUseCase.execute(req.params.id);
      res.status(HttpStatusCode.OK).json({ payment });
    } catch (error) {
      next(error);
    }
  };
}
