import { BadRequest } from "@buxlo/common";
import { IsubscriptionRepository } from "../../domain/interfaces/IsubscriptionRepository";
import { Subscription } from "../../domain/entities/subscription.entites";
import { Repository } from "typeorm";
import { SubscriptionEntity } from "../database/sql/entity/subscription.entity";
import { AppDataSource } from "../database/sql/connection";

export class SubscriptionRepository implements IsubscriptionRepository {
  private _repository: Repository<SubscriptionEntity>;

  constructor() {
    this._repository = AppDataSource.getRepository(SubscriptionEntity);
  }

  async create(data: Subscription): Promise<Subscription> {
    try {
      const subscription = this._repository.create(data);
      return await this._repository.save(subscription);
    } catch (error: any) {
      throw new BadRequest(`Failed to create subscription: ${error.message}`);
    }
  }

  async update(id: string, data: Partial<Subscription>): Promise<Subscription> {
    try {
      await this._repository.update(id, data);
      return await this._repository.findOneOrFail({ where: { id } });
    } catch (error: any) {
      console.error(
        "Error forom subscripton repository faild to update",
        error
      );
      throw new BadRequest(`Failed to update subscription: ${error.message}`);
    }
  }

  async getSubscriptionDetails(): Promise<Subscription[]> {
    try {
      return await this._repository.find();
    } catch (error: any) {
      console.error(
        "Error from subscription repository faild to fetch ",
        error
      );
      throw new BadRequest(`Failed to fetch subscription: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Subscription> {
    try {
      const plan = await this._repository.findOneBy({ id });

      if (!plan) {
        throw new BadRequest("Subscription payment not found");
      }
      return plan;
    } catch (error: any) {
      throw new BadRequest(
        `Failed to fetch subscription plan: ${error.message}`
      );
    }
  }

  async delete(id: string): Promise<Subscription> {
    try {
      const existingPlan = await this._repository.findOneBy({ id });

      if (!existingPlan) {
        throw new BadRequest("Subscription plan not found");
      }

      await this._repository.delete(id);

      return existingPlan;
    } catch (error: any) {
      console.error(
        "Error from subscription repository failed to delete",
        error
      );
      throw new BadRequest(`Failed to delete subscription: ${error.message}`);
    }
  }
}
