import { BadRequest } from "@buxlo/common";
import { IsubscriptionRepository } from "../../domain/interfaces/IsubscriptionRepository";
import { Subscription } from "../../domain/entities/subscription";
import { SubscriptionSchema } from "../database/mongodb/schema/subscription.schema";

export class SubscriptionRepository implements IsubscriptionRepository {
  async update(id: string, data: Subscription): Promise<Subscription | null> {
    try {
      return await SubscriptionSchema.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error: any) {
      throw new BadRequest(`${error.message}`);
    }
  }

  async getSubscriptionDetails(): Promise<Subscription[] | null> {
    try {
      const data = await SubscriptionSchema.find();
      return data;
    } catch (error: any) {
      console.error(error);

      throw new Error(`db error to fetch user: ${error.message}`);
    }
  }
}
