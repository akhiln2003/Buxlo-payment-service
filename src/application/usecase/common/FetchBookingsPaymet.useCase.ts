import { IpaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import {
  BookingPaymentMapper,
  BookingPaymentResponseDto,
} from "../../../domain/zodSchemaDto/output/bookingPaymentResponse.dto";
import { IFetchBookingsPaymetUseCase } from "../../interface/common/IFetchBookingsPaymetUseCase";

export class FetchBookingsPaymetUseCase implements IFetchBookingsPaymetUseCase {
  constructor(private _bookngPaymentRepository: IpaymetRepository) {}
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
    console.log("_+_+_+_+_+_+_+ ", datas);

    return {
      bookings: datas.bookings.map((data) => BookingPaymentMapper.toDto(data)),
      totalPages: datas.totalPages,
    };
  }
}
