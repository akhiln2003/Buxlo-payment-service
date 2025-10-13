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
  //   findOne(slotId: string): Promise<PaymentHistory>;

  findAll(
    userId: string,
    page: number,
    status: PaymentHistoryStatus | "all",
    searchData?: string
  ): Promise<{ datas: PaymentHistory[]; totalPages: number }>;
  cancelPendingPaymentsByUser(userId: string): Promise<PaymentHistory[]>;
}
