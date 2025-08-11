import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";

export interface IcreateCheckoutSessionUseCaseDataProps
  extends AvailabilityEntities {
  name: string;
}
export interface IcreateBookingCheckoutSessionUseCase {
  execute(
    data: IcreateCheckoutSessionUseCaseDataProps,
    userId: string,
    type: "booking" | "subscription"
  ): Promise<string>;
}
