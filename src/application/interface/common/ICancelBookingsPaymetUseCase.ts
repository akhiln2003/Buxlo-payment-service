
export interface ICancelBookingsPaymetUseCase {
  execute(
    id : string
  ): Promise<string>;
}