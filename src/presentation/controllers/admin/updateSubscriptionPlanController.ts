import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import {
  ISubscriptionPlanData,
  IUpdateSubscriptionPlanUseCase,
} from "../../../application/interface/admin/IUpdateSubscriptionPlanUseCase";

export class UpdateSubscriptionPlanController {
  constructor(
    private _updateSubscriptionPlanUseCase: IUpdateSubscriptionPlanUseCase
  ) {}
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;

      const updatedData = await this._updateSubscriptionPlanUseCase.execute(
        data.id,
        data.updatedData as ISubscriptionPlanData
      );
      res.status(HttpStatusCode.OK).json({ updatedData });
    } catch (error) {
      next(error);
    }
  };
}
