import { Wallet } from "../entities/wallet.entites";

export interface IwalletRepository {
  create(data: Wallet): Promise<Wallet>;
  fetchWallet(userId: string): Promise<Wallet[]>;
  updateWallet(
    userId: string,
    name: string,
    data: Partial<Wallet>
  ): Promise<Wallet>;
}
