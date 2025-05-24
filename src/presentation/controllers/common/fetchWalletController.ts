import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IfetchWalletUseCase } from "../../../application/interface/common/IfetchWalletUseCase";

export class FetchWalletController {
  constructor(private fetchWalletUseCase: IfetchWalletUseCase) {}
  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;
      const wallet = await this.fetchWalletUseCase.execute(id as string);
      res.status(HttpStatusCode.OK).json(wallet);
    } catch (error) {
      next(error);
    }
  };
}
