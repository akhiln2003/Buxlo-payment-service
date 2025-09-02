import { BookingPaymentResponseDto } from "../../../domain/zodSchemaDto/output/bookingPaymentResponse.dto";

export interface IFetchOnePaymentUseCase {
  execute(slotId: string): Promise<BookingPaymentResponseDto>;
}
