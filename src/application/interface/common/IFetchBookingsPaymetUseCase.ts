import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import { BookingPaymentResponseDto } from "../../dto/bookingPaymentResponse.dto";

export interface IFetchBookingsPaymetUseCase {
  execute(
    userId: string,
    page: number,
    status: PaymentStatus | "all"
  ): Promise<{ bookings: BookingPaymentResponseDto[]; totalPages: number }>;
}
