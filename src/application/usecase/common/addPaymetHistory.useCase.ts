import { BadRequest } from "@buxlo/common";
import { IPaymentHistoryRepository } from "../../../domain/interfaces/IPaymentHistoryRepository";
import {
  IAddPaymentHistoryUseCase,
  IAddPaymentHistoryUseCaseProps,
} from "../../interface/common/IAddPaymentHistoryUseCase";
import {
  PaymentHistoryMapper,
  PaymentHistoryResponseDto,
} from "../../dto/paymentHistoryResponse.dto";

export class AddPaymentHistoryUseCase implements IAddPaymentHistoryUseCase {
  constructor(private _paymentHistoryRepository: IPaymentHistoryRepository) {}
  async execute(
    data: IAddPaymentHistoryUseCaseProps
  ): Promise<PaymentHistoryResponseDto> {
    try {
      data.category = data.category.toLowerCase();
      const newData = await this._paymentHistoryRepository.create(data);
      return PaymentHistoryMapper.toDto(newData);
    } catch (error) {
      console.error("Error from createWalletUseCase :", error);

      throw new BadRequest("Faild to create Wallet");
    }
  }
}
