import { BookingPaymentResponseDto } from "../../../domain/zodSchemaDto/output/bookingPaymentResponse.dto";

export interface IfetchOnePaymentUseCase {
  execute(slotId: string): Promise<BookingPaymentResponseDto>;
}
