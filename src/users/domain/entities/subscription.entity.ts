export interface SubscriptionEntity {
  id: number;
  userId: number;
  plan: string;
  active: boolean;
  startedAt: Date;
  endsAt: Date | null;
}
