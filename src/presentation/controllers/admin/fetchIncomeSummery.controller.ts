import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchIncomeSummeryUseCase } from "../../../application/interface/admin/IFetchIncomeSummeryUseCase";

export class FetchIncomeSummeryController {
  constructor(private _fetchIncomeSummeryUseCase: IFetchIncomeSummeryUseCase) {}
  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._fetchIncomeSummeryUseCase.execute();
      res.status(HttpStatusCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}
