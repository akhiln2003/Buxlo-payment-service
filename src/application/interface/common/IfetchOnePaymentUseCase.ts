import { Payment } from "../../../domain/entities/bookingPaymentEntites";

export interface IfetchOnePaymentUseCase{
    execute(slotId:string): Promise<Payment>;
  }