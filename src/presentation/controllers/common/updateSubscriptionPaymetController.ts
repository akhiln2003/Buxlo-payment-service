import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IUpdateSubscriptionPaymetUseCase } from "../../../application/interface/common/IUpdateSubscriptionPaymetUseCase";

export class UpdateSubscriptionPaymetController {
  constructor(
    private _updateSubscriptionPaymetUseCase: IUpdateSubscriptionPaymetUseCase
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
