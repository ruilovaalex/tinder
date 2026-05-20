import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../interaction-service/generated/prisma/client';
import { readDatabaseUrl } from '../prisma-env';

@Injectable()
export class InteractionPrismaService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: readDatabaseUrl('src/interaction-service'),
      }),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
