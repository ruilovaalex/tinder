import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../subscription-service/generated/prisma/client';
import { readDatabaseUrl } from '../prisma-env';

@Injectable()
export class SubscriptionPrismaService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: readDatabaseUrl('src/subscription-service'),
      }),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
