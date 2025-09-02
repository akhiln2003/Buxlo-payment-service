import { BadRequest } from "@buxlo/common";
import { Wallet } from "../../../domain/entities/wallet";
import { IwalletRepository } from "../../../domain/interfaces/IwalletRepository";
import { IcreateWalletUseCase } from "../../interface/common/IcreateWalletUseCase";
import {
  WalletMapper,
  WalletResponseDto,
} from "../../../domain/zodSchemaDto/output/walletResponse.dto";

export class CreateWalletUseCase implements IcreateWalletUseCase {
  constructor(private _walletRepo: IwalletRepository) {}
  async execute(data: Wallet): Promise<WalletResponseDto> {
    try {
      const newData = await this._walletRepo.create(data);
      return WalletMapper.toDto(newData);
    } catch (error) {
      console.error("Error from createWalletUseCase :", error);

      throw new BadRequest("Faild to create Wallet");
    }
  }
}
