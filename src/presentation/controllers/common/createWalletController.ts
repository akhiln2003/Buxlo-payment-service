import { NextFunction, Request, Response } from "express";
import { IcreateWalletUseCase } from "../../../application/interface/common/IcreateWalletUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class CreateWalletController {
  constructor(public createWalletUseCase: IcreateWalletUseCase) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;
      const newWallet = await this.createWalletUseCase.execute(data);
      res.status(HttpStatusCode.OK).json({ newWallet });
    } catch (error) {
      next(error);
    }
  };
}
