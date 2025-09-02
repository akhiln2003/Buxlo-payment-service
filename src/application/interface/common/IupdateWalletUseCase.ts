import { WalletResponseDto } from "../../../domain/zodSchemaDto/output/walletResponse.dto";

export interface IwalletUpdateData {
  name?: string;
  balance?: number;
}
export interface IupdateWalletUseCase {
  execute(
    id: string,
    name: string,
    data: IwalletUpdateData
  ): Promise<WalletResponseDto>;
}
