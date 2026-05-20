import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../user-service/generated/prisma/client';
import { readDatabaseUrl } from '../prisma-env';

@Injectable()
export class UserPrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: readDatabaseUrl('src/user-service'),
      }),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
