import { WalletResponseDto } from "../../../domain/zodSchemaDto/output/walletResponse.dto";

export interface IfetchWalletUseCase {
  execute(id: string): Promise<WalletResponseDto[]>;
}
