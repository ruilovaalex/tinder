import { SubscriptionEntity } from '../entities/subscription.entity';

export const SUBSCRIPTION_REPOSITORY = 'SUBSCRIPTION_REPOSITORY';

export interface SubscriptionRepository {
  createDefaultSubscription(userId: number): Promise<SubscriptionEntity>;
  updateSubscription(userId: number, plan: string): Promise<SubscriptionEntity>;
}
