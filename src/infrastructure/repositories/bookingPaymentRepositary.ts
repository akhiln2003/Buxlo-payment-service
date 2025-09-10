import { BadRequest } from "@buxlo/common";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../database/sql/connection";
import { IpaymetRepository } from "../../domain/interfaces/IpaymentRepository";
import { BookingPaymentEntity } from "../database/sql/entity/bookingPayment.entity";
import { Payment } from "../../domain/entities/bookingPaymentEntites";
import { PaymentStatus } from "../@types/enums/paymentStatus";

export class BookingPaymentRepository implements IpaymetRepository {
  private _repository: Repository<BookingPaymentEntity>;

  constructor(private _manager?: EntityManager) {
    const repoManager = this._manager || AppDataSource.manager;
    this._repository = repoManager.getRepository(BookingPaymentEntity);
  }

  async create(data: Payment): Promise<Payment | boolean> {
    try {
      const existingPayment = await this._repository.findOne({
        where: {
          userId: data.userId,
          status: PaymentStatus.PENDING,
        },
      });

      if (existingPayment) {
        return false;
      }
      const newPaymentEntity = this._repository.create(data);
      const savedEntity = await this._repository.save(newPaymentEntity);

      return savedEntity;
    } catch (error: any) {
      throw new BadRequest(`Failed to create payment: ${error.message}`);
    }
  }

  async update(paymentId: string, data: Partial<Payment>): Promise<Payment> {
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
    data: Partial<Payment>
  ): Promise<Payment> {
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

  async findOne(slotId: string): Promise<Payment> {
    try {
      const paymentEntity = await this._repository.findOneBy({ slotId });

      if (!paymentEntity) {
        throw new BadRequest("Payment not found");
      }

      return paymentEntity;
    } catch (error: any) {
      throw new BadRequest(`Failed to fetch payment: ${error.message}`);
    }
  }

  async findAll(
    id: string,
    role: "user" | "mentor",
    page: number = 1,
    searchData?: string
  ): Promise<{ bookings: Payment[]; totalPages: number }> {
    try {
      const limit = 10;
      const skip = (page - 1) * limit;

      // Build query
      const query = this._repository.createQueryBuilder("payment");

      if (role === "user") {
        query.where("payment.userId = :id", { id });
      } else {
        query.where("payment.mentorId = :id", { id });
      }

      // Search filter (by referenceId or status or amount or category)
      if (searchData && searchData.trim() !== "") {
        query.andWhere(
          "(payment.referenceId ILIKE :search OR payment.status ILIKE :search OR CAST(payment.amount AS TEXT) ILIKE :search OR payment.category ILIKE :search)",
          { search: `%${searchData}%` }
        );
      }

      query.orderBy("payment.transactionDate", "DESC").skip(skip).take(limit);

      const [payments, totalCount] = await query.getManyAndCount();
      const totalPages = Math.ceil(totalCount / limit);

      return { bookings: payments, totalPages };
    } catch (error: any) {
      throw new BadRequest(`Failed to fetch payments: ${error.message}`);
    }
  }

  async cancelPendingPaymentsByUser(userId: string): Promise<Payment[]> {
    const pendingPayments = await this._repository.find({
      where: { userId, status: PaymentStatus.PENDING },
    });

    const updatedPayments: Payment[] = [];

    for (const payment of pendingPayments) {
      payment.status = PaymentStatus.FAILD;
      updatedPayments.push(await this._repository.save(payment));
    }

    return updatedPayments; 
  }
}
