import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IAddSubscriptionPlanUseCase } from "../../../application/interface/admin/IAddSubscriptionPlanUseCase";

export class AddSubscriptionPlanController {
  constructor(
    private _addSubscriptionPlanUseCase: IAddSubscriptionPlanUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const newPlans = await this._addSubscriptionPlanUseCase.execute(data);
      res.status(HttpStatusCode.OK).json({ newPlans });
    } catch (error) {
      next(error);
    }
  };
}
