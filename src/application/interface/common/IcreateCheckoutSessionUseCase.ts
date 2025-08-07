
export interface IcreateCheckoutSessionUseCase{
    execute(amount:number, mentorName:string, slotId:string ): Promise<string>;
  }