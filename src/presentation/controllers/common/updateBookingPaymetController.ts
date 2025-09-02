import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IupdateBookingPaymetUseCase } from "../../../application/interface/common/IupdateBookingPaymetUseCase";

export class UpdateBookingPaymetController {
  constructor(
    private _updateSubscriptionPaymetUseCase: IupdateBookingPaymetUseCase
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
