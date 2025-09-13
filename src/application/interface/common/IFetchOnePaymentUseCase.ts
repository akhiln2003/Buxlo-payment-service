import { BookingPaymentResponseDto } from "../../dto/bookingPaymentResponse.dto";

export interface IFetchOnePaymentUseCase {
  execute(slotId: string): Promise<BookingPaymentResponseDto>;
}
