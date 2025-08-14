import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import {
  IsubscriptionPlanData,
  IupdateSubscriptionPlanUseCase,
} from "../../../application/interface/admin/updateSubscriptionPlanUseCase";

export class UpdateSubscriptionPlanController {
  constructor(
    private _updateSubscriptionPlanUseCase: IupdateSubscriptionPlanUseCase
  ) {}
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;

      const updatedData = await this._updateSubscriptionPlanUseCase.execute(
        data.id,
        data.updatedData as IsubscriptionPlanData
      );
      res.status(HttpStatusCode.OK).json({ updatedData });
    } catch (error) {
      next(error);
    }
  };
}
