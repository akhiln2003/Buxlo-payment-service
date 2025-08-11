import { IpaymetRepository } from "../interfaces/IpaymentRepository";
import { IwalletRepository } from "../interfaces/IwalletRepository";

export interface IunitOfWork {
  withTransaction<T>(work: (uow: IunitOfWork) => Promise<T>): Promise<T>;

  getPaymentRepository(): IpaymetRepository;
  getWalletRepository(): IwalletRepository;
}
