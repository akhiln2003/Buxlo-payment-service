import { BookingPaymentResponseDto } from "../../../domain/zodSchemaDto/output/bookingPaymentResponse.dto";

export interface IFetchBookingsPaymetUseCase {
  execute(
    id: string,
    page: number,
    searchData?: string
  ): Promise<{ bookings: BookingPaymentResponseDto[]; totalPages: number }>;
}
