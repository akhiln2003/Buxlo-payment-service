import { BookingPaymentResponseDto } from "../../dto/bookingPaymentResponse.dto";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";

export interface IUpdateBookingPaymetUseCase {
  execute(
    id: string,
    data: { status: PaymentStatus }
  ): Promise<BookingPaymentResponseDto>;
}
