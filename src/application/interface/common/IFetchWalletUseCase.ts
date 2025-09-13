import { WalletResponseDto } from "../../dto/walletResponse.dto";

export interface IFetchWalletUseCase {
  execute(id: string): Promise<WalletResponseDto[]>;
}
