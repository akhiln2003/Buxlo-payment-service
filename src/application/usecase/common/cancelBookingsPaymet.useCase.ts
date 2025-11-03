import { BadRequest } from "@buxlo/common";
import { IPaymetRepository } from "../../../domain/interfaces/IpaymentRepository";
import { IwalletRepository } from "../../../domain/interfaces/IwalletRepository";
import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import { updateAvailability } from "../../../infrastructure/rpc/grpc/client";

import { ICancelBookingsPaymetUseCase } from "../../interface/common/ICancelBookingsPaymetUseCase";

export class CancelBookingsPaymetUseCase
  implements ICancelBookingsPaymetUseCase
{
  constructor(
    private _bookngPaymentRepository: IPaymetRepository,
    private _walletRepo: IwalletRepository
  ) {}
  async execute(id: string): Promise<string> {
    try {
      const data = await this._bookngPaymentRepository.cancelBooking(id);

      await this._walletRepo.updateWallet(data.userId, "Primary", {
        balance: data.amount,
      });

      await updateAvailability({
        id: data.slotId,
        status: PaymentStatus.CANCELED,
        isBooked: false,
      });

      return "Canceled booking";
    } catch (error) {
      console.error("Error from createWalletUseCase :", error);
      throw new BadRequest("Faild to create Wallet");
    }
  }
}
