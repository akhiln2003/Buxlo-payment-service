import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchSubscriptionPlanUseCase } from "../../../application/interface/common/IFetchSubscriptionPlanUseCase";

export class FetchSubscriptionPlanController {
  constructor(
    private _fetchSubscriptionPlanUseCase: IFetchSubscriptionPlanUseCase
  ) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._fetchSubscriptionPlanUseCase.execute();

      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
