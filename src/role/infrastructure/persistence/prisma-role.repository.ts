import { Injectable } from '@nestjs/common';
import { UserPrismaService } from '../../../prisma-clients/user-prisma.service';
import { CreateRoleDto } from '../../dto/create-role.dto';
import { UpdateRoleDto } from '../../dto/update-role.dto';
import { RoleEntity, RoleWithPermissionsEntity } from '../../domain/entities/role.entity';
import { RoleRepository } from '../../domain/repositories/role.repository';

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
  constructor(private readonly usersDb: UserPrismaService) {}

  create(data: CreateRoleDto): Promise<RoleEntity> {
    return this.usersDb.role.create({ data });
  }

  async findAll(): Promise<RoleWithPermissionsEntity[]> {
    const roles = await this.usersDb.role.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.rolePermissions.map((rolePermission) => ({
        id: rolePermission.permission.id,
        name: rolePermission.permission.name,
        description: rolePermission.permission.description,
      })),
    }));
  }

  async findOne(id: number): Promise<RoleWithPermissionsEntity> {
    const role = await this.usersDb.role.findUniqueOrThrow({
      where: { id },
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return {
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.rolePermissions.map((rolePermission) => ({
        id: rolePermission.permission.id,
        name: rolePermission.permission.name,
        description: rolePermission.permission.description,
      })),
    };
  }

  update(id: number, data: UpdateRoleDto): Promise<RoleEntity> {
    return this.usersDb.role.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<RoleEntity> {
    return this.usersDb.role.delete({ where: { id } });
  }
}
