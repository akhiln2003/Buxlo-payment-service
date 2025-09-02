import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IupdateSubscriptionPaymetUseCase } from "../../../application/interface/common/IupdateSubscriptionPaymetUseCase";

export class UpdateSubscriptionPaymetController {
  constructor(
    private _updateSubscriptionPaymetUseCase: IupdateSubscriptionPaymetUseCase
  ) {}
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const updateData = await this._updateSubscriptionPaymetUseCase.execute(
        id,
        req.body
      );
      res.status(HttpStatusCode.OK).json({ updateData });
    } catch (error) {
      next(error);
    }
  };
}
