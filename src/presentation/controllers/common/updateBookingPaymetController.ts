import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IUpdateBookingPaymetUseCase } from "../../../application/interface/common/IUpdateBookingPaymetUseCase";

export class UpdateBookingPaymetController {
  constructor(
    private _updateSubscriptionPaymetUseCase: IUpdateBookingPaymetUseCase
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
