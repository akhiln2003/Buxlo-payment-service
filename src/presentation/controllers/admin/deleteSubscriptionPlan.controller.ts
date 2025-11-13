import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IDeleteSubscriptionPlanUseCase } from "../../../application/interface/admin/IDeleteSubscriptionPlanUseCase";

export class DeleteSubscriptionPlanController {
  constructor(
    private _deleteSubscriptionPlanUseCase: IDeleteSubscriptionPlanUseCase
  ) {}

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedPlan = await this._deleteSubscriptionPlanUseCase.execute(id);
      res.status(HttpStatusCode.OK).json(deletedPlan);
    } catch (error) {
      next(error);
    }
  };
}
