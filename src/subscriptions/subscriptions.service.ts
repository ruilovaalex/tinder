import { Injectable } from '@nestjs/common';
import { SubscriptionPlan } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMine(userId: number) {
    return this.prisma.subscription.findUnique({
      where: { userId },
    });
  }

  async updateMine(userId: number, dto: UpdateSubscriptionDto) {
    return this.prisma.subscription.upsert({
      where: { userId },
      update: {
        plan: dto.plan,
        expiresAt: this.getExpiresAt(dto.plan),
      },
      create: {
        userId,
        plan: dto.plan,
        expiresAt: this.getExpiresAt(dto.plan),
      },
    });
  }

  private getExpiresAt(plan: SubscriptionPlan) {
    if (plan === SubscriptionPlan.FREE) {
      return null;
    }

    const expiresAt = new Date();
    expiresAt.setDate(
      expiresAt.getDate() + (plan === SubscriptionPlan.GOLD ? 30 : 90),
    );
    return expiresAt;
  }
}
