import { BadRequest } from "@buxlo/common";
import { IwalletRepository } from "../../../domain/interfaces/IwalletRepository";
import { IFetchWalletUseCase } from "../../interface/common/IFetchWalletUseCase";
import {
  WalletMapper,
  WalletResponseDto,
} from "../../../domain/zodSchemaDto/output/walletResponse.dto";

export class FetchWalletUseCase implements IFetchWalletUseCase {
  constructor(private _walletRepo: IwalletRepository) {}
  async execute(id: string): Promise<WalletResponseDto[]> {
    try {
      const data = await this._walletRepo.fetchWallet(id);
      return data.map((wallet) => WalletMapper.toDto(wallet));
    } catch (error) {
      console.error("Error from fetchWalletUseCase :", error);

      throw new BadRequest("Faild to fetch Wallet");
    }
  }
}
