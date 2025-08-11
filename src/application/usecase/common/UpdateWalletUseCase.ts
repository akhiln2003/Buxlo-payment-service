import { BadRequest } from "@buxlo/common";
import { Wallet } from "../../../domain/entities/wallet";
import { IwalletRepository } from "../../../domain/interfaces/IwalletRepository";
import {
  IupdateWalletUseCase,
  IwalletUpdateData,
} from "../../interface/common/IupdateWalletUseCase";

export class UpdateWalletUseCase implements IupdateWalletUseCase {
  constructor(private walletRepo: IwalletRepository) {}
  async execute(id: string,  name:string , data: IwalletUpdateData): Promise<Wallet | null> {
    try {              
      return await this.walletRepo.updateWallet(id,name, data);
    } catch (error) {
      console.error("Error from fetchWalletUseCase :", error);

      throw new BadRequest("Faild to fetch Wallet");
    }
  }
}
