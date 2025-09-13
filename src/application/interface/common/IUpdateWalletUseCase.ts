import { WalletResponseDto } from "../../dto/walletResponse.dto";

export interface IWalletUpdateData {
  name?: string;
  balance?: number;
}
export interface IUpdateWalletUseCase {
  execute(
    id: string,
    name: string,
    data: IWalletUpdateData
  ): Promise<WalletResponseDto>;
}
