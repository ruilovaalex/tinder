import { Inject, Injectable } from '@nestjs/common';
import { SUBSCRIPTION_REPOSITORY } from '../domain/repositories/subscription.repository';
import type { SubscriptionRepository } from '../domain/repositories/subscription.repository';

@Injectable()
export class ChangeSubscriptionUseCase {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(userId: number, plan: 'FREE' | 'PREMIUM' | 'GOLD') {
    return await this.subscriptionRepository.updateSubscription(userId, plan);
  }
}
