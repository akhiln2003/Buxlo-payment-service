import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchBookingsPaymetUseCase } from "../../../application/interface/common/IFetchBookingsPaymetUseCase";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";

export class FetchBookingsPaymetController {
  constructor(
    private _fetchBookingsPaymetUseCase: IFetchBookingsPaymetUseCase
  ) {}
  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, page, status } = req.query;
      const data = await this._fetchBookingsPaymetUseCase.execute(
        String(userId),
        Number(page),
        status as PaymentStatus | "all"
      );
      res.status(HttpStatusCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}
