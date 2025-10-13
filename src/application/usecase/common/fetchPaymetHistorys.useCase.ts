import { IPaymentHistoryRepository } from "../../../domain/interfaces/IPaymentHistoryRepository";
import { PaymentHistoryStatus } from "../../../infrastructure/@types/enums/PaymentHistoryStatus";
import {
  PaymentHistoryMapper,
  PaymentHistoryResponseDto,
} from "../../dto/paymentHistoryResponse.dto";
import { IFetchPaymetHistorysUseCase } from "../../interface/common/IFetchPaymetHistorysUseCase";

export class FetchPaymetHistorysUseCase implements IFetchPaymetHistorysUseCase {
  constructor(private _paymentHistoryRepository: IPaymentHistoryRepository) {}

  async execute(
    userId: string,
    page: number,
    status: PaymentHistoryStatus | "all" = "all",
    searchData?: string
  ): Promise<{
    datas: PaymentHistoryResponseDto[];
    totalPages: number;
  } | null> {
    try {
      const result = await this._paymentHistoryRepository.findAll(
        userId,
        page,
        status,
        searchData
      );

      if (!result) return { datas: [], totalPages: 0 };
      const mappedDatas: PaymentHistoryResponseDto[] = result.datas.map(
        (history) => PaymentHistoryMapper.toDto(history)
      );

      return { datas: mappedDatas, totalPages: result.totalPages };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
