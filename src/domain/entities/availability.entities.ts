import { PaymentStatus } from "../../infrastructure/@types/enums/paymentStatus";

export class AvailabilityEntities {
  constructor(
    public mentorId: string,
    public date: string,
    public startTime: string,
    public duration: number,
    public status: PaymentStatus,
    public isBooked: boolean,
    public salary: number,
    public description?: string,
    public id?: string
  ) {}
}
