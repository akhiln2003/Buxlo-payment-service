import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IfetchSubscriptionPlanUseCase } from "../../../application/interface/admin/IfetchSubscriptionPlanUseCase";

export class FetchSubscriptionPlanController {
  constructor(
    private fetchSubscriptionPlanUseCase: IfetchSubscriptionPlanUseCase
  ) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.fetchSubscriptionPlanUseCase.execute();

      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
