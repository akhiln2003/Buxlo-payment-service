import { Subscription } from "../entities/subscription";

export interface IsubscriptionRepository {
  create(data: Subscription): Promise<Subscription>;
  update(id: string, data: Partial<Subscription>): Promise<Subscription | null>;
  getSubscriptionDetails(): Promise<Subscription[] | null>;
}
