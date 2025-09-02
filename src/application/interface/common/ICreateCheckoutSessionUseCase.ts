import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";

export interface ICreateCheckoutSessionUseCaseDataProps
  extends AvailabilityEntities {
  name: string;
}
export interface ICreateBookingCheckoutSessionUseCase {
  execute(
    data: ICreateCheckoutSessionUseCaseDataProps,
    userId: string,
    type: "booking" | "subscription"
  ): Promise<string>;
}
