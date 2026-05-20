import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../chat-service/generated/prisma/client';
import { readDatabaseUrl } from '../prisma-env';

@Injectable()
export class ChatPrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: readDatabaseUrl('src/chat-service'),
      }),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
