export interface IFetchIncomeSummeryUseCase {
  execute(): Promise<{ totalIncome: number; incomeData: IIncomeData[] }>;
}

export interface IIncomeData {
  month: string;
  count: number;
}
