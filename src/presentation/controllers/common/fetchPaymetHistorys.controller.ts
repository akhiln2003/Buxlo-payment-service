import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchPaymetHistorysUseCase } from "../../../application/interface/common/IFetchPaymetHistorysUseCase";
import { PaymentHistoryStatus } from "../../../infrastructure/@types/enums/PaymentHistoryStatus";

export class FetchPaymetHistorysController {
  constructor(private _fetchPaymetHistorysUseCase: IFetchPaymetHistorysUseCase) {}
  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, status, userId, searchData } = req.query;

      const historys = await this._fetchPaymetHistorysUseCase.execute(
        String(userId),
        Number(page),
        String(status) as PaymentHistoryStatus | "all",
        String(searchData)
      );

      res.status(HttpStatusCode.OK).json(historys);
    } catch (error) {
      next(error);
    }
  };
}
