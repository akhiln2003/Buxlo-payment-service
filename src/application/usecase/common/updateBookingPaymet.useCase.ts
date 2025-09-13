import { IUpdateBookingPaymetUseCase } from "../../interface/common/IUpdateBookingPaymetUseCase";
import { IPaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import {
  BookingPaymentMapper,
  BookingPaymentResponseDto,
} from "../../dto/bookingPaymentResponse.dto";
import { IPaymentHistoryRepository } from "../../../domain/interfaces/IPaymentHistoryRepository";

export class UpdateBookingPaymetUseCase implements IUpdateBookingPaymetUseCase {
  constructor(
    private _bookngPaymentRepository: IPaymetRepository,
    private _paymentHistoryRepository: IPaymentHistoryRepository
  ) {}
  async execute(
    id: string,
    data: { status: PaymentStatus }
  ): Promise<BookingPaymentResponseDto> {
    const updatedData = await this._bookngPaymentRepository.update(id, data);
    const historyData = {
      amount: updatedData.amount,
      category: "slotBooking",
      paymentId: updatedData.paymentId,
      status: updatedData.status,
      userId: updatedData.userId,
    };

    await this._paymentHistoryRepository.create(historyData);
    return BookingPaymentMapper.toDto(updatedData);
  }
}
