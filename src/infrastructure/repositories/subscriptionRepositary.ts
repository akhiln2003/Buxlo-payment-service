import { BadRequest } from "@buxlo/common";
import { IsubscriptionRepository } from "../../domain/interfaces/IsubscriptionRepository";
import { Subscription } from "../../domain/entities/subscription";
import { Repository } from "typeorm";
import { SubscriptionEntity } from "../database/sql/entity/subscription.entity";
import { AppDataSource } from "../database/sql/connection";
import {
  SubscriptionMapper,
  SubscriptionResponseDto,
} from "../../zodSchemaDto/output/subscriptionResponse.dto";

export class SubscriptionRepository implements IsubscriptionRepository {
  private _repository: Repository<SubscriptionEntity>;

  constructor() {
    this._repository = AppDataSource.getRepository(SubscriptionEntity);
  }

  async create(data: Subscription): Promise<SubscriptionResponseDto> {
    try {
      const subscription = this._repository.create(data);
      const saved = await this._repository.save(subscription);
      return SubscriptionMapper.toDto(saved);
    } catch (error: any) {
      throw new BadRequest(`Failed to create subscription: ${error.message}`);
    }
  }

  async update(
    id: string,
    data: Partial<Subscription>
  ): Promise<SubscriptionResponseDto> {
    try {
      await this._repository.update(id, data);
      const updated = await this._repository.findOneOrFail({ where: { id } });
      return SubscriptionMapper.toDto(updated);
    } catch (error: any) {
      console.error(
        "Error forom subscripton repository faild to update",
        error
      );
      throw new BadRequest(`Failed to update subscription: ${error.message}`);
    }
  }

  async getSubscriptionDetails(): Promise<SubscriptionResponseDto[]> {
    try {
      const data = await this._repository.find();
      return data.map((sub) => SubscriptionMapper.toDto(sub));
    } catch (error: any) {
      console.error(
        "Error from subscription repository faild to fetch ",
        error
      );
      throw new BadRequest(`Failed to fetch subscription: ${error.message}`);
    }
  }
}
