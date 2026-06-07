import 'dotenv/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SubscriptionPrismaService } from '../prisma-clients/subscription-prisma.service';
import { UserPrismaService } from '../prisma-clients/user-prisma.service';
import { AuthService } from './application/auth.service';
import { AUTH_REPOSITORY } from './domain/repositories/auth.repository';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { PermissionsGuard } from './infrastructure/guards/permissions.guard';
import { PrismaAuthRepository } from './infrastructure/persistence/prisma-auth.repository';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { RolesGuard } from './infrastructure/guards/roles.guard';

function requireSecret(name: string): string {
  const value = process.env[name];
  if (!value || value.length < 32) {
    throw new Error(`${name} must contain at least 32 characters`);
  }
  return value;
}

const jwtSecret = requireSecret('JWT_SECRET');
requireSecret('JWT_REFRESH_SECRET');

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {
        expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN ?? '15m') as never,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PermissionsGuard,
    RolesGuard,
    UserPrismaService,
    SubscriptionPrismaService,
    { provide: AUTH_REPOSITORY, useClass: PrismaAuthRepository },
  ],
  exports: [AuthService, JwtModule, JwtStrategy, PermissionsGuard, RolesGuard],
})
export class AuthModule {}
