import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchPaymentHistorySummaryUseCase } from "../../../application/interface/user/IFetchPaymentHistorySummaryUseCase";

export class FetchPaymentHistorySummaryController {
  constructor(
    private _fetchPaymentHistorySummaryUseCase: IFetchPaymentHistorySummaryUseCase
  ) {}
  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, year, startMonth, startDate, endDate } =
        req.query;
      const summary = await this._fetchPaymentHistorySummaryUseCase.execute(
        userId as string,
        year?.toString(),
        startMonth?.toString(),
        startDate?.toString(),
        endDate?.toString()
      );

      res.status(HttpStatusCode.OK).json(summary);
    } catch (error) {
      next(error);
    }
  };
}
