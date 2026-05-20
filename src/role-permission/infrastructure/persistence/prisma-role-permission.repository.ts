import { Injectable } from '@nestjs/common';
import { UserPrismaService } from '../../../prisma-clients/user-prisma.service';
import { CreateRolePermissionDto } from '../../dto/create-role-permission.dto';
import {
  RolePermissionEntity,
  RolePermissionWithPermissionEntity,
  RolePermissionWithRoleAndPermissionEntity,
} from '../../domain/entities/role-permission.entity';
import { RolePermissionRepository } from '../../domain/repositories/role-permission.repository';

@Injectable()
export class PrismaRolePermissionRepository
  implements RolePermissionRepository
{
  constructor(private readonly usersDb: UserPrismaService) {}

  assign(data: CreateRolePermissionDto): Promise<RolePermissionEntity> {
    return this.usersDb.rolePermission.create({ data });
  }

  async findAll(): Promise<RolePermissionWithRoleAndPermissionEntity[]> {
    return await this.usersDb.rolePermission.findMany({
      include: {
        role: true,
        permission: true,
      },
    });
  }

  async findByRole(
    roleId: number,
  ): Promise<RolePermissionWithPermissionEntity[]> {
    return await this.usersDb.rolePermission.findMany({
      where: { roleId },
      include: {
        permission: true,
      },
    });
  }

  remove(id: number): Promise<RolePermissionEntity> {
    return this.usersDb.rolePermission.delete({ where: { id } });
  }
}
