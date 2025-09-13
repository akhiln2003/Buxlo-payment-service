import { IPaymetRepository } from "../interfaces/IpaymentRepository";
import { IwalletRepository } from "../interfaces/IwalletRepository";

export interface IunitOfWork {
  withTransaction<T>(work: (uow: IunitOfWork) => Promise<T>): Promise<T>;

  getPaymentRepository(): IPaymetRepository;
  getWalletRepository(): IwalletRepository;
}
