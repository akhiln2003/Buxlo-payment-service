import { Subscription } from "../entities/subscription";

export interface IsubscriptionRepository {
  update(id: string, data: any): Promise<Subscription | null>;
  getSubscriptionDetails(): Promise<Subscription[] | null>;
}
