import { Subscription } from "../entities/subscription.entites";

export interface IsubscriptionRepository {
  create(data: Subscription): Promise<Subscription>;
  update(id: string, data: Partial<Subscription>): Promise<Subscription>;
  getSubscriptionDetails(): Promise<Subscription[]>;
  findById(id: string): Promise<Subscription>;
  delete(id: string): Promise<Subscription>;
}
