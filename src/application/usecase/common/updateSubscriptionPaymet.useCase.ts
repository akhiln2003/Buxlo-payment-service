import { PaymentStatus } from "../../../infrastructure/@types/enums/paymentStatus";
import { IUpdateSubscriptionPaymetUseCase } from "../../interface/common/IUpdateSubscriptionPaymetUseCase";
import { IsubscriptionPaymentRepository } from "../../../domain/interfaces/IsubscriptionPaymentRepository";
import {
  SubscriptionPaymentMapper,
  SubscriptionPaymentResponseDto,
} from "../../dto/subscriptionPaymentResponse.dto";
import { IPaymentHistoryRepository } from "../../../domain/interfaces/IPaymentHistoryRepository";
import { PaymentHistoryStatus } from "../../../infrastructure/@types/enums/PaymentHistoryStatus";
import { PaymentType } from "../../../infrastructure/@types/enums/PaymentType";

export class UpdateSubscriptionPaymetUseCase
  implements IUpdateSubscriptionPaymetUseCase
{
  constructor(
    private _subscriptionPaymentRepository: IsubscriptionPaymentRepository,
    private _paymentHistoryRepository: IPaymentHistoryRepository
  ) {}
  async execute(
    id: string,
    data: { status: PaymentStatus }
  ): Promise<SubscriptionPaymentResponseDto> {
    const updatedData = await this._subscriptionPaymentRepository.update(
      id,
      data
    );

    const mapPaymentStatusToHistoryStatus = (
      status: PaymentStatus
    ): PaymentHistoryStatus => {
      switch (status) {
        case PaymentStatus.BOOKED:
          return PaymentHistoryStatus.COMPLETED;
        case PaymentStatus.CANCELED:
          return PaymentHistoryStatus.FAILD;
        case PaymentStatus.PENDING:
          return PaymentHistoryStatus.PENDING;
        case PaymentStatus.FAILD:
          return PaymentHistoryStatus.FAILD;
        case PaymentStatus.AVAILABLE:
          return PaymentHistoryStatus.PENDING; 
        default:
          throw new Error(`Unknown PaymentStatus: ${status}`);
      }
    };

    const historyData = {
      amount: updatedData.amount,
      category: "slotBooking",
      paymentId: updatedData.paymentId,
      type: PaymentType.DEBIT,
      status: mapPaymentStatusToHistoryStatus(
        updatedData.status != PaymentStatus.AVAILABLE
          ? updatedData.status
          : PaymentStatus.PENDING
      ),
      userId: updatedData.userId,
    };

    await this._paymentHistoryRepository.create(historyData);
    return SubscriptionPaymentMapper.toDto(updatedData);
  }
}
