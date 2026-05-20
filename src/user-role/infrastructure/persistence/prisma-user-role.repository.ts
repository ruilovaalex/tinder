import { Injectable } from '@nestjs/common';
import { UserPrismaService } from '../../../prisma-clients/user-prisma.service';
import { CreateUserRoleDto } from '../../dto/create-user-role.dto';
import {
  UserRoleEntity,
  UserRoleWithRoleEntity,
  UserRoleWithUserAndRoleEntity,
} from '../../domain/entities/user-role.entity';
import { UserRoleRepository } from '../../domain/repositories/user-role.repository';

@Injectable()
export class PrismaUserRoleRepository implements UserRoleRepository {
  constructor(private readonly usersDb: UserPrismaService) {}

  assign(data: CreateUserRoleDto): Promise<UserRoleEntity> {
    return this.usersDb.userRole.create({ data });
  }

  async findAll(): Promise<UserRoleWithUserAndRoleEntity[]> {
    const userRoles = await this.usersDb.userRole.findMany({
      include: {
        user: true,
        role: true,
      },
    });

    return userRoles.map((userRole) => ({
      id: userRole.id,
      userId: userRole.userId,
      roleId: userRole.roleId,
      role: userRole.role,
      user: {
        id: userRole.user.id,
        name: userRole.user.name,
        email: userRole.user.email,
        age: userRole.user.age,
      },
    }));
  }

  async findByUser(userId: number): Promise<UserRoleWithRoleEntity[]> {
    const userRoles = await this.usersDb.userRole.findMany({
      where: { userId },
      include: {
        role: true,
      },
    });

    return userRoles.map((userRole) => ({
      id: userRole.id,
      userId: userRole.userId,
      roleId: userRole.roleId,
      role: userRole.role,
    }));
  }

  remove(id: number): Promise<UserRoleEntity> {
    return this.usersDb.userRole.delete({ where: { id } });
  }
}
