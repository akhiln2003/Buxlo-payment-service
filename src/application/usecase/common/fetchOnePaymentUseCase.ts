import { BadRequest } from "@buxlo/common";
import { IfetchOnePaymentUseCase } from "../../interface/common/IfetchOnePaymentUseCase";
import { IpaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import { Payment } from "../../../domain/entities/bookingPaymentEntites";

export class FetchOnePaymentUseCase implements IfetchOnePaymentUseCase {
  constructor(private _paymetRepo: IpaymetRepository) {}
  async execute(slotId: string): Promise<Payment> {
    try {
      return await this._paymetRepo.findOne(slotId);
    } catch (error) {
      console.error("Error from fetchWalletUseCase :", error);

      throw new BadRequest("Faild to fetch Wallet");
    }
  }
}
