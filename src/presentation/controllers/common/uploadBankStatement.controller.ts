import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IUploadBankStatementUseCase } from "../../../application/interface/common/IUploadBankStatementUseCase";

export class UploadBankStatementController {
  constructor(
    private _uploadBankStatementUseCase: IUploadBankStatementUseCase
  ) {}
  upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.query;
      const data = await this._uploadBankStatementUseCase.execute(
        String(userId),
        req.file as Express.Multer.File
      );
      res.status(HttpStatusCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}
