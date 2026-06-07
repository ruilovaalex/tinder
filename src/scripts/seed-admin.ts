import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { readDatabaseUrl } from '../prisma-env';
import { PrismaClient } from '../user-service/generated/prisma/client';
import { PrismaClient as SubscriptionPrismaClient } from '../subscription-service/generated/prisma/client';

const permissions = [
  'assign_role',
  'create_role',
  'read_role',
  'update_role',
  'delete_role',
  'assign_permission',
  'create_permission',
  'read_permission',
  'update_permission',
  'delete_permission',
];

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not defined`);
  }
  return value;
}

async function seedAdmin(): Promise<void> {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: readDatabaseUrl('src/user-service'),
    }),
  });
  const subscriptions = new SubscriptionPrismaClient({
    adapter: new PrismaPg({
      connectionString: readDatabaseUrl('src/subscription-service'),
    }),
  });

  try {
    const adminRole = await prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
        description: 'Administrador del sistema',
      },
    });

    await prisma.role.upsert({
      where: { name: 'user' },
      update: {},
      create: {
        name: 'user',
        description: 'Usuario regular de la aplicacion',
      },
    });

    for (const name of permissions) {
      const permission = await prisma.permission.upsert({
        where: { name },
        update: {},
        create: { name, description: `Permiso ${name}` },
      });

      await prisma.rolePermission.upsert({
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
      });
    }

    const email = requireEnv('ADMIN_EMAIL');
    const password = requireEnv('ADMIN_PASSWORD');
    const name = process.env.ADMIN_NAME ?? 'Administrador';
    const age = Number(process.env.ADMIN_AGE ?? 25);

    if (password.length < 12) {
      throw new Error('ADMIN_PASSWORD must contain at least 12 characters');
    }

    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        age,
        password: await bcrypt.hash(password, 10),
        isActive: true,
      },
      create: {
        name,
        email,
        age,
        password: await bcrypt.hash(password, 10),
        profile: { create: {} },
      },
    });

    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: admin.id,
          roleId: adminRole.id,
        },
      },
      update: {},
      create: {
        userId: admin.id,
        roleId: adminRole.id,
      },
    });

    await subscriptions.subscription.upsert({
      where: { userId: admin.id },
      update: {},
      create: { userId: admin.id, plan: 'FREE' },
    });

    console.log(`Admin RBAC preparado para ${admin.email}`);
  } finally {
    await Promise.all([prisma.$disconnect(), subscriptions.$disconnect()]);
  }
}

void seedAdmin();
