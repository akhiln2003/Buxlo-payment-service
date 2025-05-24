import { Wallet } from "../../../domain/entities/wallet";

export interface IfetchWalletUseCase {
  execute(id:string): Promise<Wallet | null>;
}
