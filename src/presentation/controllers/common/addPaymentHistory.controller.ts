import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IAddPaymentHistoryUseCase } from "../../../application/interface/common/IAddPaymentHistoryUseCase";

export class AddPaymentHistoryControler {
  constructor(private _addPaymentHistoryUseCase: IAddPaymentHistoryUseCase) {}
  add = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const newPayment = await this._addPaymentHistoryUseCase.execute(data);
      res.status(HttpStatusCode.OK).json(newPayment);
    } catch (error) {
      next(error);
    }
  };
}
