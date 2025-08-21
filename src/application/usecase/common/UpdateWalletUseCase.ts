import { BadRequest } from "@buxlo/common";
import { IwalletRepository } from "../../../domain/interfaces/IwalletRepository";
import {
  IupdateWalletUseCase,
  IwalletUpdateData,
} from "../../interface/common/IupdateWalletUseCase";
import { WalletResponseDto } from "../../../zodSchemaDto/output/walletResponse.dto";

export class UpdateWalletUseCase implements IupdateWalletUseCase {
  constructor(private _walletRepo: IwalletRepository) {}
  async execute(
    id: string,
    name: string,
    data: IwalletUpdateData
  ): Promise<WalletResponseDto> {
    try {
      return await this._walletRepo.updateWallet(id, name, data);
    } catch (error) {
      console.error("Error from fetchWalletUseCase :", error);

      throw new BadRequest("Faild to fetch Wallet");
    }
  }
}
