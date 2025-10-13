import { BadRequest } from "@buxlo/common";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../database/sql/connection";
import { IPaymentHistoryRepository } from "../../domain/interfaces/IPaymentHistoryRepository";
import { PaymentHistoryEntity } from "../database/sql/entity/paymentHistory.entity";
import { PaymentHistory } from "../../domain/entities/paymentHistory.entityes";
import { PaymentHistoryStatus } from "../@types/enums/PaymentHistoryStatus";

export class PaymentHistoryRepository implements IPaymentHistoryRepository {
  private _repository: Repository<PaymentHistoryEntity>;

  constructor(private _manager?: EntityManager) {
    const repoManager = this._manager || AppDataSource.manager;
    this._repository = repoManager.getRepository(PaymentHistoryEntity);
  }

  async create(data: PaymentHistory): Promise<PaymentHistory> {
    try {
      await this._repository.delete({ paymentId: data.paymentId });
      const newPaymentHistory = this._repository.create(data);
      const savedEntity = await this._repository.save(newPaymentHistory);

      return savedEntity;
    } catch (error: any) {
      throw new BadRequest(
        `Failed to create payment history: ${error.message}`
      );
    }
  }

  async update(
    paymentId: string,
    data: Partial<PaymentHistory>
  ): Promise<PaymentHistory> {
    try {
      const paymentEntity = await this._repository.findOneBy({ paymentId });

      if (!paymentEntity) {
        throw new BadRequest("Payment not found");
      }

      const updatedPaymentEntity = this._repository.merge(paymentEntity, data);
      return await this._repository.save(updatedPaymentEntity);
    } catch (error: any) {
      throw new BadRequest(`Failed to update payment: ${error.message}`);
    }
  }
  async findByIdAndUpdate(
    id: string,
    data: Partial<PaymentHistory>
  ): Promise<PaymentHistory> {
    try {
      const paymentEntity = await this._repository.findOneBy({ id });

      if (!paymentEntity) {
        throw new BadRequest("Payment not found");
      }

      const updatedPaymentEntity = this._repository.merge(paymentEntity, data);
      return await this._repository.save(updatedPaymentEntity);
    } catch (error: any) {
      throw new BadRequest(`Failed to update payment: ${error.message}`);
    }
  }

  //   async findOne(slotId: string): Promise<PaymentHistory> {
  //     try {
  //       const paymentEntity = await this._repository.findOneBy({ slotId });

  //       if (!paymentEntity) {
  //         throw new BadRequest("Payment not found");
  //       }

  //       return paymentEntity;
  //     } catch (error: any) {
  //       throw new BadRequest(`Failed to fetch payment: ${error.message}`);
  //     }
  //   }

  async findAll(
    userId: string,
    page: number = 1,
    status: PaymentHistoryStatus | "all" = "all",
    searchData?: string
  ): Promise<{ datas: PaymentHistory[]; totalPages: number }> {
    try {
      const limit = 10;
      const skip = (page - 1) * limit;

      const query = this._repository.createQueryBuilder("payment");

      // always filter by userId
      query.where("payment.userId = :userId", { userId });

      // filter by status (if not "all")
      if (status !== "all") {
        query.andWhere("payment.status = :status", { status });
      }

      // search filter
      if (searchData && searchData.trim() !== "") {
        query.andWhere(
          `(payment.paymentId ILIKE :search 
      OR payment.status ILIKE :search 
      OR CAST(payment.amount AS TEXT) ILIKE :search 
      OR payment.category ILIKE :search)`,
          { search: `%${searchData}%` }
        );
      }

      query.orderBy("payment.transactionDate", "DESC").skip(skip).take(limit);

      const [payments, totalCount] = await query.getManyAndCount();
      const totalPages = Math.ceil(totalCount / limit);

      return { datas: payments, totalPages };
    } catch (error: any) {
      throw new BadRequest(`Failed to fetch payments: ${error.message}`);
    }
  }

  async cancelPendingPaymentsByUser(userId: string): Promise<PaymentHistory[]> {
    const pendingPayments = await this._repository.find({
      where: { userId, status: PaymentHistoryStatus.PENDING },
    });

    const updatedPayments: PaymentHistory[] = [];

    for (const payment of pendingPayments) {
      payment.status = PaymentHistoryStatus.FAILD;
      updatedPayments.push(await this._repository.save(payment));
    }

    return updatedPayments;
  }
}
