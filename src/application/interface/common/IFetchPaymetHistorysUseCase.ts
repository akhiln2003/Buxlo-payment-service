import { PaymentHistoryStatus } from "../../../infrastructure/@types/enums/PaymentHistoryStatus";
import { PaymentHistoryResponseDto } from "../../dto/paymentHistoryResponse.dto";

export interface IFetchPaymetHistorysUseCase {
  execute(
    userId: string,
    page: number,
    status: PaymentHistoryStatus | "all",
    searchData?: string
  ): Promise<{ datas: PaymentHistoryResponseDto[]; totalPages: number } | null>;
}
