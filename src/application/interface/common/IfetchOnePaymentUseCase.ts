import { BookingPaymentResponseDto } from "../../../zodSchemaDto/output/bookingPaymentResponse.dto";

export interface IfetchOnePaymentUseCase{
    execute(slotId:string): Promise<BookingPaymentResponseDto>;
  }