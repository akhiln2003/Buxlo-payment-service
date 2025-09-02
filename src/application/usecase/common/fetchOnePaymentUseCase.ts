import { BadRequest } from "@buxlo/common";
import { IFetchOnePaymentUseCase } from "../../interface/common/IFetchOnePaymentUseCase";
import { IpaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import {
  BookingPaymentMapper,
  BookingPaymentResponseDto,
} from "../../../domain/zodSchemaDto/output/bookingPaymentResponse.dto";

export class FetchOnePaymentUseCase implements IFetchOnePaymentUseCase {
  constructor(private _paymetRepo: IpaymetRepository) {}
  async execute(slotId: string): Promise<BookingPaymentResponseDto> {
    try {
      const data = await this._paymetRepo.findOne(slotId);
      return BookingPaymentMapper.toDto(data);
    } catch (error) {
      console.error("Error from fetchWalletUseCase :", error);

      throw new BadRequest("Faild to fetch Wallet");
    }
  }
}
