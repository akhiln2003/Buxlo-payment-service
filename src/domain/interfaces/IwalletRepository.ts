import { WalletResponseDto } from "../../zodSchemaDto/output/walletResponse.dto";
import { Wallet } from "../entities/wallet";

export interface IwalletRepository {
  create(data: Wallet): Promise<WalletResponseDto>;
  fetchWallet(userId: string): Promise<WalletResponseDto[]>;
  updateWallet(
    userId: string,
    name: string,
    data: Partial<Wallet>
  ): Promise<WalletResponseDto>;
}
