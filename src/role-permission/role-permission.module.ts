import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserPrismaService } from '../prisma-clients/user-prisma.service';
import { RolePermissionService } from './application/role-permission.service';
import { ROLE_PERMISSION_REPOSITORY } from './domain/repositories/role-permission.repository';
import { RolePermissionController } from './infrastructure/controllers/role-permission.controller';
import { PrismaRolePermissionRepository } from './infrastructure/persistence/prisma-role-permission.repository';

@Module({
  imports: [AuthModule],
  controllers: [RolePermissionController],
  providers: [
    RolePermissionService,
    UserPrismaService,
    {
      provide: ROLE_PERMISSION_REPOSITORY,
      useClass: PrismaRolePermissionRepository,
    },
  ],
})
export class RolePermissionModule {}
