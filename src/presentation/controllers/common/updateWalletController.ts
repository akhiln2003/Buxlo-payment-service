import { NextFunction, Request, Response } from "express";
import { IUpdateWalletUseCase } from "../../../application/interface/common/IUpdateWalletUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class UpdateWalletController {
  constructor(private _updateWalletUseCase: IUpdateWalletUseCase) {}
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, name } = req.params;
      const updateData = await this._updateWalletUseCase.execute(
        id,
        name,
        req.body
      );
      res.status(HttpStatusCode.OK).json({ updateData });
    } catch (error) {
      next(error);
    }
  };
}
