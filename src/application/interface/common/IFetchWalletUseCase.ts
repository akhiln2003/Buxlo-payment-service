import { WalletResponseDto } from "../../../domain/zodSchemaDto/output/walletResponse.dto";

export interface IFetchWalletUseCase {
  execute(id: string): Promise<WalletResponseDto[]>;
}
