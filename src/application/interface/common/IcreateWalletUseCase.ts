import { Wallet } from "../../../domain/entities/wallet";

export interface IcreateWalletUseCase {
  execute(data:Wallet): Promise<Wallet>;
}
