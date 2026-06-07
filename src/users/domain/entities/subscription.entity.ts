export type SubscriptionPlan = 'FREE' | 'PREMIUM' | 'GOLD';
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'EXPIRED';

export interface SubscriptionEntity {
  id: number;
  userId: number;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startedAt: Date;
  endsAt: Date | null;
}
