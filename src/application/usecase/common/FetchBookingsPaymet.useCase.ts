import { IPaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
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
    searchData?: string
  ): Promise<{ bookings: BookingPaymentResponseDto[]; totalPages: number }> {
    const datas = await this._bookngPaymentRepository.findAll(
      id,
      "user",
      page,
      searchData
    );

    return {
      bookings: datas.bookings.map((data) => BookingPaymentMapper.toDto(data)),
      totalPages: datas.totalPages,
    };
  }
}
