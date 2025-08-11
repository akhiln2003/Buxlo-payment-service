import { AppDataSource } from "../database/sql/connection";
import { EntityManager } from "typeorm";
import { BookingPaymentRepository } from "./bookingPaymentRepositary";
import { WalletRepository } from "../repositories/walletRepositary";
import { IunitOfWork } from "../../domain/entities/IunitOfWork";

export class TypeORMUnitOfWork implements IunitOfWork {
  constructor(private manager?: EntityManager) {}

  async withTransaction<T>(work: (uow: IunitOfWork) => Promise<T>): Promise<T> {
    return AppDataSource.transaction(async (transactionManager) => {
      const transactionalUoW = new TypeORMUnitOfWork(transactionManager);
      return work(transactionalUoW);
    });
  }

  getPaymentRepository(): BookingPaymentRepository {
    return new BookingPaymentRepository(this.manager);
  }

  getWalletRepository(): WalletRepository {
    return new WalletRepository(this.manager);
  }
}
