import { WalletResponseDto } from "../../../zodSchemaDto/output/walletResponse.dto";

export interface IfetchWalletUseCase {
  execute(id: string): Promise<WalletResponseDto[]>;
}
