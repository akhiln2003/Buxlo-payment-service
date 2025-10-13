import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { ICancelBookingsPaymetUseCase } from "../../../application/interface/common/ICancelBookingsPaymetUseCase";

export class CancelBookingsPaymetController {
  constructor(
    private _cancelBookingsPaymetUseCase: ICancelBookingsPaymetUseCase
  ) {}
  cancel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await this._cancelBookingsPaymetUseCase.execute(id);
      res.status(HttpStatusCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}
