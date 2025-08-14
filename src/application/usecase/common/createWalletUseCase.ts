import { BadRequest } from "@buxlo/common";
import { Wallet } from "../../../domain/entities/wallet";
import { IwalletRepository } from "../../../domain/interfaces/IwalletRepository";
import { IcreateWalletUseCase } from "../../interface/common/IcreateWalletUseCase";

export class CreateWalletUseCase implements IcreateWalletUseCase {
  constructor(private _walletRepo: IwalletRepository) {}
  async execute(data: Wallet): Promise<Wallet> {
    try {
      return await this._walletRepo.create(data);
    } catch (error) {
      console.error("Error from createWalletUseCase :", error);

      throw new BadRequest("Faild to create Wallet");
    }
  }
}
