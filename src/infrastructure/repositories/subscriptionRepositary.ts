import { BadRequest } from "@buxlo/common";
import { IsubscriptionRepository } from "../../domain/interfaces/IsubscriptionRepository";
import { Subscription } from "../../domain/entities/subscription";
import { Repository } from "typeorm";
import { SubscriptionEntity } from "../database/sql/entity/subscription.entity";
import { AppDataSource } from "../database/sql/connection";

export class SubscriptionRepository implements IsubscriptionRepository {
  private repository: Repository<SubscriptionEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(SubscriptionEntity);
  }

  async create(data: Subscription): Promise<Subscription> {
    try {
      const subscription = this.repository.create(data);
      return await this.repository.save(subscription);
    } catch (error: any) {
      throw new BadRequest(`Failed to create subscription: ${error.message}`);
    }
  }

  async update(
    id: string,
    data: Partial<Subscription>
  ): Promise<Subscription | null> {
    try {
      await this.repository.update(id, data);
      return await this.repository.findOneOrFail({ where: { id: id } });
    } catch (error: any) {
      console.error(
        "Error forom subscripton repository faild to update",
        error
      );
      throw new BadRequest(`Failed to update subscription: ${error.message}`);
    }
  }  


  async getSubscriptionDetails(): Promise<Subscription[] | null> {
    try {
      const data = await this.repository.find();
      return data;
    } catch (error: any) {
      console.error("Error from subscription repository faild to fetch ",error);
      throw new BadRequest(`Failed to fetch subscription: ${error.message}`);
    }
  }
}
