import { BadRequest } from "@buxlo/common";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../database/sql/connection";
import { IpaymetRepository } from "../../domain/interfaces/IpaymentRepository";
import { BookingPaymentEntity } from "../database/sql/entity/bookingPayment.entity";
import { Payment } from "../../domain/entities/bookingPaymentEntites";
import { PaymentStatus } from "../@types/enums/paymentStatus";
import {
  BookingPaymentMapper,
  BookingPaymentResponseDto,
} from "../../zodSchemaDto/output/bookingPaymentResponse.dto";

export class BookingPaymentRepository implements IpaymetRepository {
  private _repository: Repository<BookingPaymentEntity>;

  constructor(private _manager?: EntityManager) {
    const repoManager = this._manager || AppDataSource.manager;
    this._repository = repoManager.getRepository(BookingPaymentEntity);
  }

  async create(data: Payment): Promise<BookingPaymentResponseDto | boolean> {
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
      return BookingPaymentMapper.toDto(savedEntity);
    } catch (error: any) {
      throw new BadRequest(`Failed to create payment: ${error.message}`);
    }
  }

  async update(
    paymentId: string,
    data: Partial<Payment>
  ): Promise<BookingPaymentResponseDto> {
    try {
      const paymentEntity = await this._repository.findOneBy({ paymentId });

      if (!paymentEntity) {
        throw new BadRequest("Payment not found");
      }

      const updatedPaymentEntity = this._repository.merge(paymentEntity, data);
      const savedEntity = await this._repository.save(updatedPaymentEntity);

      return BookingPaymentMapper.toDto(savedEntity);
    } catch (error: any) {
      console.error("");

      throw new BadRequest(`Failed to update payment: ${error.message}`);
    }
  }

  async findOne(slotId: string): Promise<BookingPaymentResponseDto> {
    try {
      const paymentEntity = await this._repository.findOneBy({ slotId });

      if (!paymentEntity) {
        throw new BadRequest("Payment not found");
      }

      return BookingPaymentMapper.toDto(paymentEntity);
    } catch (error: any) {
      throw new BadRequest(`Failed to fetch payment: ${error.message}`);
    }
  }

  async findAll(
    id: string,
    role: "user" | "mentor"
  ): Promise<BookingPaymentResponseDto[]> {
    try {
      if (role == "user") {
        const paymentEntities = await this._repository.find({
          where: { userId: id },
          order: { transactionDate: "DESC" },
        });
        if (!paymentEntities.length) {
          return [];
        }

        return paymentEntities.map((entity) =>
          BookingPaymentMapper.toDto(entity)
        );
      } else {
        const paymentEntities = await this._repository.find({
          where: { mentorId: id },
          order: { transactionDate: "DESC" },
        });
        if (!paymentEntities.length) {
          return [];
        }

        return paymentEntities.map((entity) =>
          BookingPaymentMapper.toDto(entity)
        );
      }
    } catch (error: any) {
      throw new BadRequest(`Failed to fetch payments: ${error.message}`);
    }
  }
}
