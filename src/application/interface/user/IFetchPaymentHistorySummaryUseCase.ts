export interface IFetchPaymentHistorySummaryUseCase {
  execute(
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
  }>;
}
