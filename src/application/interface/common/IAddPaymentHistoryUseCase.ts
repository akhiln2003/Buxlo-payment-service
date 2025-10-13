import { PaymentHistoryStatus } from "../../../infrastructure/@types/enums/PaymentHistoryStatus";
import { PaymentType } from "../../../infrastructure/@types/enums/PaymentType";
import { PaymentHistoryResponseDto } from "../../dto/paymentHistoryResponse.dto";

export interface IAddPaymentHistoryUseCaseProps {
  amount: number;
  userId: string;
  status: PaymentHistoryStatus;
  paymentId: string;
  category: string;
  transactionDate: Date;
  type: PaymentType;
}
export interface IAddPaymentHistoryUseCase {
  execute(
    data: IAddPaymentHistoryUseCaseProps
  ): Promise<PaymentHistoryResponseDto>;
}
