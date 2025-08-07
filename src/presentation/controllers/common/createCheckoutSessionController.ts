import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IcreateCheckoutSessionUseCase } from "../../../application/interface/common/IcreateCheckoutSessionUseCase";

export class CreateCheckoutSessionController {
  constructor(
    public createCheckoutSessionUseCase: IcreateCheckoutSessionUseCase
  ) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount, mentorName, slotId } = req.body;
      const sessionId = await this.createCheckoutSessionUseCase.execute(
        amount,
        mentorName,
        slotId
      );
      res.status(HttpStatusCode.OK).json({ sessionId });
    } catch (error) {
      next(error);
    }
  };
}
