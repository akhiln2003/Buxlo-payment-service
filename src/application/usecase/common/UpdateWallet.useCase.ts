import { BadRequest } from "@buxlo/common";
import { IwalletRepository } from "../../../domain/interfaces/IwalletRepository";
import {
  IUpdateWalletUseCase,
  IWalletUpdateData,
} from "../../interface/common/IUpdateWalletUseCase";
import {
  WalletMapper,
  WalletResponseDto,
} from "../../../domain/zodSchemaDto/output/walletResponse.dto";

export class UpdateWalletUseCase implements IUpdateWalletUseCase {
  constructor(private _walletRepo: IwalletRepository) {}
  async execute(
    id: string,
    name: string,
    data: IWalletUpdateData
  ): Promise<WalletResponseDto> {
    try {
      const updatedData = await this._walletRepo.updateWallet(id, name, data);
      return WalletMapper.toDto(updatedData);
    } catch (error) {
      console.error("Error from fetchWalletUseCase :", error);

      throw new BadRequest("Faild to fetch Wallet");
    }
  }
}
