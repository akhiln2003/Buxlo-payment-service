import { IUpdateBookingPaymetUseCase } from "../../interface/common/IUpdateBookingPaymetUseCase";
import { IPaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import {
  BookingPaymentMapper,
  BookingPaymentResponseDto,
} from "../../dto/bookingPaymentResponse.dto";
import { IPaymentHistoryRepository } from "../../../domain/interfaces/IPaymentHistoryRepository";
import { PaymentHistoryStatus } from "../../../infrastructure/@types/enums/PaymentHistoryStatus";
import { PaymentType } from "../../../infrastructure/@types/enums/PaymentType";

export class UpdateBookingPaymetUseCase implements IUpdateBookingPaymetUseCase {
  constructor(
    private _bookngPaymentRepository: IPaymetRepository,
    private _paymentHistoryRepository: IPaymentHistoryRepository
  ) {}
  async execute(
    id: string,
    data: { status: PaymentStatus }
  ): Promise<BookingPaymentResponseDto> {
    const mapPaymentStatusToHistoryStatus = (
      status: PaymentStatus
    ): PaymentHistoryStatus => {
      switch (status) {
        case PaymentStatus.BOOKED:
          return PaymentHistoryStatus.COMPLETED;
        case PaymentStatus.CANCELED:
          return PaymentHistoryStatus.FAILD;
        case PaymentStatus.PENDING:
          return PaymentHistoryStatus.PENDING;
        case PaymentStatus.FAILD:
          return PaymentHistoryStatus.FAILD;
        case PaymentStatus.AVAILABLE:
          return PaymentHistoryStatus.PENDING; // or COMPLETED depending on your logic
        default:
          throw new Error(`Unknown PaymentStatus: ${status}`);
      }
    };
    const updatedData = await this._bookngPaymentRepository.update(id, data);
    const historyData = {
      amount: updatedData.amount,
      category: "slotBooking",
      paymentId: updatedData.paymentId,
      type: PaymentType.DEBIT,
      status: mapPaymentStatusToHistoryStatus(
        updatedData.status != PaymentStatus.AVAILABLE
          ? updatedData.status
          : PaymentStatus.PENDING
      ),
      userId: updatedData.userId,
    };

    await this._paymentHistoryRepository.create(historyData);
    return BookingPaymentMapper.toDto(updatedData);
  }
}
