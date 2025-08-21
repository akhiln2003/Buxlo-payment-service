import { BadRequest } from "@buxlo/common";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../database/sql/connection";
import { SubscriptionPaymentEntity } from "../database/sql/entity/subscriptionPayment.entity";
import { IsubscriptionPaymentRepository } from "../../domain/interfaces/IsubscriptionPaymentRepository";
import { SubscriptionPayment } from "../../domain/entities/subscriptionPaymentEntity";
import {
  SubscriptionPaymentMapper,
  SubscriptionPaymentResponseDto,
} from "../../zodSchemaDto/output/subscriptionPaymentResponse.dto";

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
  ): Promise<SubscriptionPaymentResponseDto | boolean> {
    try {
      const newPaymentEntity = this._repository.create(data);
      const savedEntity = await this._repository.save(newPaymentEntity);
      return SubscriptionPaymentMapper.toDto(savedEntity);
    } catch (error: any) {
      throw new BadRequest(
        `Failed to create subscription payment: ${error.message}`
      );
    }
  }

  //   async update(paymentId: string, data: Partial<SubscriptionPayment>): Promise<SubscriptionPayment> {
  //     try {
  //       const paymentEntity = await this.repository.findOneBy({ paymentId });

  //       if (!paymentEntity) {
  //         throw new BadRequest("Subscription payment not found");
  //       }

  //       const updatedPaymentEntity = this.repository.merge(paymentEntity, data);
  //       const savedEntity = await this.repository.save(updatedPaymentEntity);

  //       return new SubscriptionPayment(
  //         savedEntity.amount,
  //         savedEntity.userId,
  //         savedEntity.type as SubscriptionPlan,
  //         savedEntity.paymentId,
  //         savedEntity.id,
  //         savedEntity.transactionDate,
  //         savedEntity.updatedAt
  //       );
  //     } catch (error: any) {
  //       console.error("Failed to update subscription payment:", error.message);
  //       throw new BadRequest(`Failed to update subscription payment: ${error.message}`);
  //     }
  //   }

  //   async findOne(paymentId: string): Promise<SubscriptionPayment> {
  //     try {
  //       const paymentEntity = await this.repository.findOneBy({ paymentId });

  //       if (!paymentEntity) {
  //         throw new BadRequest("Subscription payment not found");
  //       }

  //       return new SubscriptionPayment(
  //         paymentEntity.amount,
  //         paymentEntity.userId,
  //         paymentEntity.type as SubscriptionPlan,
  //         paymentEntity.paymentId,
  //         paymentEntity.id,
  //         paymentEntity.transactionDate,
  //         paymentEntity.updatedAt
  //       );
  //     } catch (error: any) {
  //       throw new BadRequest(`Failed to fetch subscription payment: ${error.message}`);
  //     }
  //   }

  //   async findByUserId(userId: string): Promise<SubscriptionPayment[]> {
  //     try {
  //       const paymentEntities = await this.repository.find({
  //         where: { userId },
  //         order: { transactionDate: "DESC" },
  //       });

  //       if (!paymentEntities.length) {
  //         return [];
  //       }

  //       return paymentEntities.map(
  //         (entity) =>
  //           new SubscriptionPayment(
  //             entity.amount,
  //             entity.userId,
  //             entity.type as SubscriptionPlan,
  //             entity.paymentId,
  //             entity.id,
  //             entity.transactionDate,
  //             entity.updatedAt
  //           )
  //       );
  //     } catch (error: any) {
  //       throw new BadRequest(`Failed to fetch subscription payments: ${error.message}`);
  //     }
  //   }

  //   async findAll(): Promise<SubscriptionPayment[]> {
  //     try {
  //       const paymentEntities = await this.repository.find({
  //         order: { transactionDate: "DESC" },
  //       });

  //       if (!paymentEntities.length) {
  //         return [];
  //       }

  //       return paymentEntities.map(
  //         (entity) =>
  //           new SubscriptionPayment(
  //             entity.amount,
  //             entity.userId,
  //             entity.type as SubscriptionPlan,
  //             entity.paymentId,
  //             entity.id,
  //             entity.transactionDate,
  //             entity.updatedAt
  //           )
  //       );
  //     } catch (error: any) {
  //       throw new BadRequest(`Failed to fetch subscription payments: ${error.message}`);
  //     }
  //   }
}
