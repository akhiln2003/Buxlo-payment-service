import { BadRequest } from "@buxlo/common";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../database/sql/connection";
import { SubscriptionPaymentEntity } from "../database/sql/entity/subscriptionPayment.entity";
import { IsubscriptionPaymentRepository } from "../../domain/interfaces/IsubscriptionPaymentRepository";
import { SubscriptionPayment } from "../../domain/entities/subscriptionPayment.entity";
import { PaymentStatus } from "../@types/enums/paymentStatus";

export class SubscriptionPaymentRepository
  implements IsubscriptionPaymentRepository
{
  private _repository: Repository<SubscriptionPaymentEntity>;

  constructor(private _manager?: EntityManager) {
    const repoManager = this._manager || AppDataSource.manager;
    this._repository = repoManager.getRepository(SubscriptionPaymentEntity);
  }

  async create(
    data: SubscriptionPayment
  ): Promise<SubscriptionPayment | boolean> {
    try {
      const newPaymentEntity = this._repository.create(data);
      return await this._repository.save(newPaymentEntity);
    } catch (error: any) {
      throw new BadRequest(
        `Failed to create subscription payment: ${error.message}`
      );
    }
  }

  async update(
    paymentId: string,
    data: Partial<SubscriptionPayment>
  ): Promise<SubscriptionPayment> {
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
    data: Partial<SubscriptionPayment>
  ): Promise<SubscriptionPayment> {
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

  async cancelPendingPaymentsByUser(
    userId: string
  ): Promise<SubscriptionPayment[]> {
    const pendingPayments = await this._repository.find({
      where: { userId, status: PaymentStatus.PENDING },
    });

    const updatedPayments: SubscriptionPayment[] = [];

    for (const payment of pendingPayments) {
      payment.status = PaymentStatus.FAILD;
      updatedPayments.push(await this._repository.save(payment));
    }

    return updatedPayments;
  }

  async getSummery(): Promise<{
    totalIncome: number;
    incomeData: { month: string; count: number }[];
  }> {
    try {
      const totalResult = await this._repository
        .createQueryBuilder("payment")
        .select("SUM(payment.amount)", "total")
        .where("payment.status = :status", { status: PaymentStatus.BOOKED })
        .getRawOne();

      const totalIncome = parseFloat(totalResult?.total || "0");

      const monthlyResult = await this._repository
        .createQueryBuilder("payment")
        .select("EXTRACT(MONTH FROM payment.transactionDate)", "month")
        .addSelect("SUM(payment.amount)", "count")
        .where("payment.status = :status", { status: PaymentStatus.BOOKED })
        .groupBy("month")
        .orderBy("month", "ASC")
        .getRawMany();

      // ✅ 3️⃣ Month names array
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthMap = new Map<number, number>();
      monthlyResult.forEach((row) => {
        monthMap.set(parseInt(row.month), parseFloat(row.count));
      });

      const incomeData = monthNames.map((name, i) => ({
        month: name,
        count: monthMap.get(i + 1) || 0, // default 0
      }));

      return { totalIncome, incomeData };
    } catch (error: any) {
      throw new BadRequest(`Failed to get payment summary: ${error.message}`);
    }
  }
}
