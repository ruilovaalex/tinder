import { Injectable } from '@nestjs/common';
import { SubscriptionPrismaService } from '../../../prisma-clients/subscription-prisma.service';
import { UserPrismaService } from '../../../prisma-clients/user-prisma.service';
import { AuthUserEntity } from '../../domain/entities/auth-user.entity';
import {
  AuthRepository,
  CreateAuthUserData,
  DefaultRbacRoles,
} from '../../domain/repositories/auth.repository';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(
    private readonly usersDb: UserPrismaService,
    private readonly subscriptionsDb: SubscriptionPrismaService,
  ) {}

  async findByEmail(email: string): Promise<AuthUserEntity | null> {
    const user = await this.usersDb.user.findUnique({
      where: { email },
      include: this.userAuthInclude(),
    });

    return user ? this.toAuthUser(user) : null;
  }

  async createUser(data: CreateAuthUserData): Promise<AuthUserEntity> {
    const user = await this.usersDb.user.create({
      data: {
        name: data.name,
        email: data.email,
        age: data.age,
        password: data.passwordHash,
        userRoles: {
          create: {
            roleId: data.roleId,
          },
        },
      },
      include: this.userAuthInclude(),
    });

    return this.toAuthUser(user);
  }

  async createProfile(userId: number): Promise<void> {
    await this.usersDb.profile.create({ data: { userId } });
  }

  async createDefaultSubscription(userId: number): Promise<void> {
    await this.subscriptionsDb.subscription.create({
      data: { userId, plan: 'FREE' },
    });
  }

  countUsersByRole(roleId: number): Promise<number> {
    return this.usersDb.userRole.count({
      where: { roleId },
    });
  }

  async ensureDefaultRbacData(
    defaultPermissions: string[],
  ): Promise<DefaultRbacRoles> {
    const adminRole = await this.usersDb.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
        description: 'Administrador del sistema',
      },
    });

    const userRole = await this.usersDb.role.upsert({
      where: { name: 'user' },
      update: {},
      create: {
        name: 'user',
        description: 'Usuario regular de la aplicacion',
      },
    });

    const permissions = await Promise.all(
      defaultPermissions.map((permission) =>
        this.usersDb.permission.upsert({
          where: { name: permission },
          update: {},
          create: {
            name: permission,
            description: `Permiso ${permission}`,
          },
        }),
      ),
    );

    await Promise.all(
      permissions.map((permission) =>
        this.usersDb.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: adminRole.id,
              permissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: adminRole.id,
            permissionId: permission.id,
          },
        }),
      ),
    );

    return { adminRole, userRole };
  }

  isUniqueConstraintError(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    );
  }

  private toAuthUser(user: PrismaAuthUser): AuthUserEntity {
    const permissions = new Set<string>();

    for (const userRole of user.userRoles) {
      for (const rolePermission of userRole.role.rolePermissions) {
        permissions.add(rolePermission.permission.name);
      }
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      isActive: user.isActive,
      roles: user.userRoles.map((userRole) => userRole.role.name),
      permissions: [...permissions],
    };
  }

  private userAuthInclude() {
    return {
      userRoles: {
        include: {
          role: {
            include: {
              rolePermissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    } as const;
  }

  private findAuthUserShape() {
    return this.usersDb.user.findUniqueOrThrow({
      where: { id: 0 },
      include: this.userAuthInclude(),
    });
  }
}

type PrismaAuthUser = Awaited<
  ReturnType<PrismaAuthRepository['findAuthUserShape']>
>;
