import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchBookingsPaymetUseCase } from "../../../application/interface/common/IFetchBookingsPaymetUseCase";

export class FetchBookingsPaymetController {
  constructor(public fetchBookingsPaymetUseCase: IFetchBookingsPaymetUseCase) {}
  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, page } = req.params;
      const data = await this.fetchBookingsPaymetUseCase.execute(
        id,
        Number(page)
      );
      res.status(HttpStatusCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}
