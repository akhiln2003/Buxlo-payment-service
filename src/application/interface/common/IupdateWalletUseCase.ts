import { Wallet } from "../../../domain/entities/wallet";

export interface IwalletUpdateData{
    name?:string,
    balance?:number
}
export interface IupdateWalletUseCase {
  execute(id:string , name:string, data:IwalletUpdateData): Promise<Wallet | null>;
}
