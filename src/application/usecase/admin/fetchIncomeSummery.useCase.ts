import { IsubscriptionPaymentRepository } from "../../../domain/interfaces/IsubscriptionPaymentRepository";
import {
  IFetchIncomeSummeryUseCase,
  IIncomeData,
} from "../../interface/admin/IFetchIncomeSummeryUseCase";

export class FetchIncomeSummeryUseCase implements IFetchIncomeSummeryUseCase {
  constructor(
    private _subscriptionPaymentRepository: IsubscriptionPaymentRepository
  ) {}

  async execute(): Promise<{ totalIncome: number; incomeData: IIncomeData[] }> {
    return await this._subscriptionPaymentRepository.getSummery();
  }
}
