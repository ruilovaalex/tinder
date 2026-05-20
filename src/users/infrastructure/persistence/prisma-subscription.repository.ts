import { Injectable } from '@nestjs/common';
import { SubscriptionPrismaService } from '../../../prisma-clients/subscription-prisma.service';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';

@Injectable()
export class PrismaSubscriptionRepository implements SubscriptionRepository {
  constructor(private readonly subscriptionsDb: SubscriptionPrismaService) {}

  createDefaultSubscription(userId: number): Promise<SubscriptionEntity> {
    return this.subscriptionsDb.subscription.create({
      data: { userId, plan: 'FREE' },
    });
  }

  async updateSubscription(
    userId: number,
    plan: string,
  ): Promise<SubscriptionEntity> {
    const subscription = await this.subscriptionsDb.subscription.findFirst({
      where: { userId },
    });

    if (subscription) {
      return await this.subscriptionsDb.subscription.update({
        where: { id: subscription.id },
        data: { plan },
      });
    }

    return await this.subscriptionsDb.subscription.create({
      data: { userId, plan },
    });
  }
}
