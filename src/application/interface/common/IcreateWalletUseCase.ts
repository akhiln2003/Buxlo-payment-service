import { Wallet } from "../../../domain/entities/wallet";
import { WalletResponseDto } from "../../../zodSchemaDto/output/walletResponse.dto";

export interface IcreateWalletUseCase {
  execute(data:Wallet): Promise<WalletResponseDto>;
}
