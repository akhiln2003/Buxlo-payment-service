import { IUpdateBookingPaymetUseCase } from "../../interface/common/IUpdateBookingPaymetUseCase";
import { IpaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import {
  BookingPaymentMapper,
  BookingPaymentResponseDto,
} from "../../../domain/zodSchemaDto/output/bookingPaymentResponse.dto";

export class UpdateBookingPaymetUseCase implements IUpdateBookingPaymetUseCase {
  constructor(private _bookngPaymentRepository: IpaymetRepository) {}
  async execute(
    id: string,
    data: { status: PaymentStatus }
  ): Promise<BookingPaymentResponseDto> {
    const updatedData = await this._bookngPaymentRepository.update(id, data);
    return BookingPaymentMapper.toDto(updatedData);
  }
}
