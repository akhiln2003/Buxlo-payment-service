import { WalletResponseDto } from "../../dto/walletResponse.dto";

export interface ICreateWalletUseCaseProps {
  balance: number;
  name: string;
  userId: string;
}
export interface ICreateWalletUseCase {
  execute(data: ICreateWalletUseCaseProps): Promise<WalletResponseDto>;
}
