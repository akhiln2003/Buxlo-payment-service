import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IFetchWalletUseCase } from "../../../application/interface/common/IFetchWalletUseCase";

export class FetchWalletController {
  constructor(private _fetchWalletUseCase: IFetchWalletUseCase) {}
  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;
      const wallet = await this._fetchWalletUseCase.execute(id as string);
      res.status(HttpStatusCode.OK).json(wallet);
    } catch (error) {
      next(error);
    }
  };
}
