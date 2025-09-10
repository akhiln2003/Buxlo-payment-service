import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";

export interface ICreateCheckoutSessionUseCaseDataProps {
  mentorId: string;
  date: string;
  startTime: string;
  duration: number;
  status: PaymentStatus;
  isBooked: boolean;
  salary: number;
  description?: string;
  id?: string;
  name:string
}
export interface ICreateBookingCheckoutSessionUseCase {
  execute(
    data: ICreateCheckoutSessionUseCaseDataProps,
    userId: string,
    type: "booking" | "subscription"
  ): Promise<string>;
}
