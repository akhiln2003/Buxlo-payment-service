import { IPaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import {
  BookingPaymentMapper,
  BookingPaymentResponseDto,
} from "../../dto/bookingPaymentResponse.dto";
import { IFetchBookingsPaymetUseCase } from "../../interface/common/IFetchBookingsPaymetUseCase";

export class FetchBookingsPaymetUseCase implements IFetchBookingsPaymetUseCase {
  constructor(private _bookngPaymentRepository: IPaymetRepository) {}
  async execute(
    id: string,
    page: number,
    status: PaymentStatus | "all" = "all"
  ): Promise<{ bookings: BookingPaymentResponseDto[]; totalPages: number }> {
    const datas = await this._bookngPaymentRepository.findByUserId(
      id,
      page,
      status
    );
    return {
      bookings: datas.bookings.map((data) => BookingPaymentMapper.toDto(data)),
      totalPages: datas.totalPages,
    };
  }
}
