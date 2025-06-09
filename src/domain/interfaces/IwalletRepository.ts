import { Wallet } from "../entities/wallet";

export interface IwalletRepository {
  create(data: Wallet): Promise<Wallet>;
  fetchWallet(userId: string): Promise<Wallet[] | null>;
  updateWallet(id: string, data: Partial<Wallet>): Promise<Wallet | null>;
}
