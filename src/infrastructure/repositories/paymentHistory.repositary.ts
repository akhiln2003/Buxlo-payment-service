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

  async getPaymentSummary(
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
  }> {
    try {
      // Normalize bad values from frontend
      if (startDate === "undefined" || startDate === "") startDate = undefined;
      if (endDate === "undefined" || endDate === "") endDate = undefined;
      if (startMonth === "undefined" || startMonth === "")
        startMonth = undefined;
      if (year === "undefined" || year === "") year = undefined;

      const query = this._repository
        .createQueryBuilder("payment")
        .select("payment.category", "category")
        .addSelect(
          `SUM(CASE WHEN payment.type = 'credit' THEN payment.amount ELSE 0 END)`,
          "totalCredit"
        )
        .addSelect(
          `SUM(CASE WHEN payment.type = 'debit' THEN payment.amount ELSE 0 END)`,
          "totalDebit"
        )
        .where("payment.userId = :userId", { userId })
        .andWhere("payment.status = :status", {
          status: PaymentHistoryStatus.COMPLETED,
        });

      // Filter by year
      if (year) {
        query.andWhere("EXTRACT(YEAR FROM payment.transactionDate) = :year", {
          year: Number(year),
        });
      }

      // Filter by month range
      if (year && startMonth) {
        query.andWhere(
          `EXTRACT(YEAR FROM payment.transactionDate) = :year 
           AND EXTRACT(MONTH FROM payment.transactionDate) = :month`,
          { year: Number(year), month: Number(startMonth) }
        );
      }

      // Filter by date range
      if (startDate && endDate) {
        query.andWhere(
          "payment.transactionDate BETWEEN :startDate AND :endDate",
          { startDate, endDate }
        );
      }

      query.groupBy("payment.category");

      const rawResults = await query.getRawMany();

      // Compute overall totals
      const totalCredit = rawResults.reduce(
        (sum, r) => sum + Number(r.totalCredit || 0),
        0
      );
      const totalDebit = rawResults.reduce(
        (sum, r) => sum + Number(r.totalDebit || 0),
        0
      );

      // Format category-wise data
      const categoryWise = rawResults.map((r) => ({
        category: r.category || "Uncategorized",
        totalDebit: Number(r.totalDebit || 0),
      }));

      // Add synthetic summary rows
      categoryWise.unshift({ category: "Credit", totalDebit: 0 });
      categoryWise.push({ category: "Debit", totalDebit });

      return {
        totalCredit,
        totalDebit,
        categoryWise,
      };
    } catch (error: any) {
      throw new BadRequest(`Failed to fetch payment summary: ${error.message}`);
    }
  }
}
