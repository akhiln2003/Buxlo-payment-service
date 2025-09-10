import { BadRequest } from "@buxlo/common";
import { IwalletRepository } from "../../../domain/interfaces/IwalletRepository";
import {
  ICreateWalletUseCase,
  ICreateWalletUseCaseProps,
} from "../../interface/common/ICreateWalletUseCase";
import {
  WalletMapper,
  WalletResponseDto,
} from "../../../domain/zodSchemaDto/output/walletResponse.dto";

export class CreateWalletUseCase implements ICreateWalletUseCase {
  constructor(private _walletRepo: IwalletRepository) {}
  async execute(data: ICreateWalletUseCaseProps): Promise<WalletResponseDto> {
    try {
      const newData = await this._walletRepo.create(data);
      return WalletMapper.toDto(newData);
    } catch (error) {
      console.error("Error from createWalletUseCase :", error);

      throw new BadRequest("Faild to create Wallet");
    }
  }
}
