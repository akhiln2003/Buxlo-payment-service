import { BadRequest } from "@buxlo/common";
import { Wallet } from "../../../domain/entities/wallet";
import { IwalletRepository } from "../../../domain/interfaces/IwalletRepository";
import { IfetchWalletUseCase } from "../../interface/common/IfetchWalletUseCase";

export class FetchWalletUseCase implements IfetchWalletUseCase {
  constructor(private _walletRepo: IwalletRepository) {}
  async execute(id: string): Promise<Wallet[] | null> {
    try {
      return await this._walletRepo.fetchWallet(id);
    } catch (error) {
      console.error("Error from fetchWalletUseCase :", error);

      throw new BadRequest("Faild to fetch Wallet");
    }
  }
}
