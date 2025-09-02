import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IfetchSubscriptionPlanByIdUseCase } from "../../../application/interface/common/IfetchSubscriptionPlanByIdUseCase";

export class FetchSubscriptionPlanByIdController {
  constructor(
    private _fetchSubscriptionPlanByIdUseCase: IfetchSubscriptionPlanByIdUseCase
  ) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await this._fetchSubscriptionPlanByIdUseCase.execute(id);

      res.status(HttpStatusCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}
