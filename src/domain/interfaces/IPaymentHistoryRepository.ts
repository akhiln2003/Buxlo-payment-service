import { PaymentHistoryStatus } from "../../infrastructure/@types/enums/PaymentHistoryStatus";
import { PaymentHistory } from "../entities/paymentHistory.entityes";

export interface IPaymentHistoryRepository {
  create(data: PaymentHistory): Promise<PaymentHistory>;

  update(
    paymentId: string,
    data: Partial<PaymentHistory>
  ): Promise<PaymentHistory>;

  findByIdAndUpdate(
    id: string,
    data: Partial<PaymentHistory>
  ): Promise<PaymentHistory>;

  findAll(
    userId: string,
    page: number,
    status: PaymentHistoryStatus | "all",
    searchData?: string
  ): Promise<{ datas: PaymentHistory[]; totalPages: number }>;

  cancelPendingPaymentsByUser(userId: string): Promise<PaymentHistory[]>;

  findExistingPaymentIds(
    userId: string,
    paymentIds: string[]
  ): Promise<string[]>;

  getPaymentSummary(
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
