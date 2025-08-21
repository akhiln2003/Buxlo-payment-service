import { SubscriptionPaymentResponseDto } from "../../zodSchemaDto/output/subscriptionPaymentResponse.dto";
import { SubscriptionPayment } from "../entities/subscriptionPaymentEntity";

export interface IsubscriptionPaymentRepository {
  create(data: SubscriptionPayment): Promise<SubscriptionPaymentResponseDto | boolean>;
  // update(paymentId: string, data: Partial<SubscriptionPayment>): Promise<SubscriptionPayment>;
  // findOne(slotId:string):Promise<SubscriptionPayment>
  // findAll(id:string , role: "user" | "mentor"):Promise<SubscriptionPayment[] | []>

}
