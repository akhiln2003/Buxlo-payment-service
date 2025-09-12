import { z } from "zod";
import { Wallet } from "../../entities/wallet.entites";

export const WalletResponseDto = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  name: z.string(),
  balance: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type WalletResponseDto = z.infer<typeof WalletResponseDto>;

export class WalletMapper {
  static toDto(wallet: Wallet): WalletResponseDto {
    return WalletResponseDto.parse({
      id: wallet.id,
      userId: wallet.userId,
      name: wallet.name,
      balance: Number(wallet.balance),
      createdAt: new Date(wallet.createdAt as Date),
      updatedAt: new Date(wallet.updatedAt as Date),
    });
  }
}
