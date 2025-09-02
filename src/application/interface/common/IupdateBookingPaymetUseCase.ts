import { BookingPaymentResponseDto } from "../../../domain/zodSchemaDto/output/bookingPaymentResponse.dto";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";

export interface IupdateBookingPaymetUseCase {
  execute(id: string,data:{status:PaymentStatus}): Promise<BookingPaymentResponseDto>;
}
