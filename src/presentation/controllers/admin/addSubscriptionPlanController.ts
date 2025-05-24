import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IaddSubscriptionPlanUseCase } from "../../../application/interface/admin/IaddSubscriptionPlanUseCase";

export class AddSubscriptionPlanController {
  constructor(
    private addSubscriptionPlanUseCase: IaddSubscriptionPlanUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const newPlans = await this.addSubscriptionPlanUseCase.execute(data);
      res.status(HttpStatusCode.OK).json({ newPlans });
    } catch (error) {
      next(error);
    }
  };
}
