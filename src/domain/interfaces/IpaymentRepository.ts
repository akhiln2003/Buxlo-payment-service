import { Payment } from "../entities/bookingPaymentEntites";

export interface IpaymetRepository {
  create(data: Payment): Promise<Payment | boolean>;
  update(paymentId: string, data: Partial<Payment>): Promise<Payment>;
  findOne(slotId:string):Promise<Payment>
  findAll(id:string , role: "user" | "mentor"):Promise<Payment[] | []>

}
