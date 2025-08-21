import { BadRequest } from "@buxlo/common";
import { IfetchOnePaymentUseCase } from "../../interface/common/IfetchOnePaymentUseCase";
import { IpaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import { BookingPaymentResponseDto } from "../../../zodSchemaDto/output/bookingPaymentResponse.dto";

export class FetchOnePaymentUseCase implements IfetchOnePaymentUseCase {
  constructor(private _paymetRepo: IpaymetRepository) {}
  async execute(slotId: string): Promise<BookingPaymentResponseDto> {
    try {
      return await this._paymetRepo.findOne(slotId);
    } catch (error) {
      console.error("Error from fetchWalletUseCase :", error);

      throw new BadRequest("Faild to fetch Wallet");
    }
  }
}
