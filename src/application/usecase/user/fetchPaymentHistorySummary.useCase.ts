import { IPaymentHistoryRepository } from "../../../domain/interfaces/IPaymentHistoryRepository";
import { IFetchPaymentHistorySummaryUseCase } from "../../interface/user/IFetchPaymentHistorySummaryUseCase";

export class FetchPaymentHistorySummaryUseCase
  implements IFetchPaymentHistorySummaryUseCase
{
  constructor(private _paymentHistoryRepository: IPaymentHistoryRepository) {}
  async execute(
    userId: string,
    year?: string,
    startMonth?: string,
    startDate?: string,
    endDate?: string
  ): Promise<{
    totalCredit: number;
    totalDebit: number;
    categoryWise: {
      category: string;
      totalDebit: number;
    }[];
  }> {
    return await this._paymentHistoryRepository.getPaymentSummary(
      userId,
      year,
      startMonth,
      startDate,
      endDate
    );
  }
}
