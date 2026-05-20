import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserPrismaService } from '../prisma-clients/user-prisma.service';
import { RoleService } from './application/role.service';
import { ROLE_REPOSITORY } from './domain/repositories/role.repository';
import { RoleController } from './infrastructure/controllers/role.controller';
import { PrismaRoleRepository } from './infrastructure/persistence/prisma-role.repository';

@Module({
  imports: [AuthModule],
  controllers: [RoleController],
  providers: [
    RoleService,
    UserPrismaService,
    { provide: ROLE_REPOSITORY, useClass: PrismaRoleRepository },
  ],
})
export class RoleModule {}
