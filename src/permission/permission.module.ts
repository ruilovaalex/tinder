import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserPrismaService } from '../prisma-clients/user-prisma.service';
import { PermissionService } from './application/permission.service';
import { PERMISSION_REPOSITORY } from './domain/repositories/permission.repository';
import { PermissionController } from './infrastructure/controllers/permission.controller';
import { PrismaPermissionRepository } from './infrastructure/persistence/prisma-permission.repository';

@Module({
  imports: [AuthModule],
  controllers: [PermissionController],
  providers: [
    PermissionService,
    UserPrismaService,
    { provide: PERMISSION_REPOSITORY, useClass: PrismaPermissionRepository },
  ],
})
export class PermissionModule {}
