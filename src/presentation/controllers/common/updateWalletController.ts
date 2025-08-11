import { NextFunction, Request, Response } from "express";
import { IupdateWalletUseCase } from "../../../application/interface/common/IupdateWalletUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class UpdateWalletController {
  constructor(private updateWalletUseCase: IupdateWalletUseCase) {}
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id,name } = req.params;
      const updateData = await this.updateWalletUseCase.execute(id,name, req.body);
      res.status(HttpStatusCode.OK).json({ updateData });
    } catch (error) {
      next(error);
    }
  };
}
