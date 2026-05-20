import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserPrismaService } from '../prisma-clients/user-prisma.service';
import { UserRoleService } from './application/user-role.service';
import { USER_ROLE_REPOSITORY } from './domain/repositories/user-role.repository';
import { UserRoleController } from './infrastructure/controllers/user-role.controller';
import { PrismaUserRoleRepository } from './infrastructure/persistence/prisma-user-role.repository';

@Module({
  imports: [AuthModule],
  controllers: [UserRoleController],
  providers: [
    UserRoleService,
    UserPrismaService,
    { provide: USER_ROLE_REPOSITORY, useClass: PrismaUserRoleRepository },
  ],
})
export class UserRoleModule {}
