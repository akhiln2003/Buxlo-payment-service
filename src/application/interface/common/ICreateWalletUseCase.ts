import { Wallet } from "../../../domain/entities/wallet";
import { WalletResponseDto } from "../../../domain/zodSchemaDto/output/walletResponse.dto";

export interface ICreateWalletUseCase {
  execute(data: Wallet): Promise<WalletResponseDto>;
}
