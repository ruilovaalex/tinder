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

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'tinder_jwt_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PermissionsGuard,
    UserPrismaService,
    SubscriptionPrismaService,
    { provide: AUTH_REPOSITORY, useClass: PrismaAuthRepository },
  ],
  exports: [AuthService, JwtModule, JwtStrategy, PermissionsGuard],
})
export class AuthModule {}
