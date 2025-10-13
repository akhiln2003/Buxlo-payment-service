import { PaymentHistoryResponseDto } from "../../dto/paymentHistoryResponse.dto";

export interface IUploadBankStatementUseCase {
  execute(
    userId: string,
    file: Express.Multer.File
  ): Promise<PaymentHistoryResponseDto[]>;
}
