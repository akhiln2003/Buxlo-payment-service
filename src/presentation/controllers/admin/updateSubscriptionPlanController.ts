import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import {
  IsubscriptionPlanData,
  IupdateSubscriptionPlanUseCase,
} from "../../../application/interface/admin/updateSubscriptionPlanUseCase";

export class UpdateSubscriptionPlanController {
  constructor(
    private updateSubscriptionPlanUseCase: IupdateSubscriptionPlanUseCase
  ) {}
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, updatedData } = req.body;

      const data = await this.updateSubscriptionPlanUseCase.execute(
        id,
        updatedData as IsubscriptionPlanData
      );
      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
