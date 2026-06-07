import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AUTH_REPOSITORY } from '../domain/repositories/auth.repository';
import type { AuthRepository } from '../domain/repositories/auth.repository';
import type { AuthResponse } from '../interfaces/auth-response.interface';
import type { AuthenticatedUser } from '../interfaces/authenticated-user.interface';
import type { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly defaultPermissions = [
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

  constructor(
    private readonly jwtService: JwtService,
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository,
  ) {}

  async register(data: RegisterDto): Promise<AuthResponse> {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const { userRole } = await this.authRepository.ensureDefaultRbacData(
      this.defaultPermissions,
    );

    try {
      const user = await this.authRepository.createUser({
        name: data.name,
        email: data.email,
        age: data.age,
        passwordHash,
        roleId: userRole.id,
      });

      await this.authRepository.createProfile(user.id);
      await this.authRepository.createDefaultSubscription(user.id);

      return await this.issueTokenPair(user);
    } catch (error: unknown) {
      if (this.authRepository.isUniqueConstraintError(error)) {
        throw new ConflictException('El usuario ya existe');
      }

      throw error;
    }
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    return await this.issueTokenPair(user);
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    const payload = await this.verifyRefreshToken(refreshToken);
    const user = await this.authRepository.findById(payload.sub);

    if (!user || !user.isActive || !user.refreshTokenHash) {
      throw new UnauthorizedException('Refresh token invalido');
    }

    const tokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );

    if (!tokenMatches) {
      throw new UnauthorizedException('Refresh token invalido');
    }

    return await this.issueTokenPair(user);
  }

  async logout(userId: number): Promise<void> {
    await this.authRepository.updateRefreshTokenHash(userId, null);
  }

  async validateAccessToken(payload: JwtPayload): Promise<AuthenticatedUser> {
    if (payload.tokenType !== 'access') {
      throw new UnauthorizedException('Tipo de token invalido');
    }

    const user = await this.authRepository.findById(payload.sub);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    return this.toAuthenticatedUser(user);
  }

  private async issueTokenPair(user: AuthenticatedUser): Promise<AuthResponse> {
    const basePayload = {
      sub: user.id,
      email: user.email,
    };
    const refreshSecret = this.getRequiredEnv('JWT_REFRESH_SECRET');
    const accessToken = await this.jwtService.signAsync({
      ...basePayload,
      tokenType: 'access',
    } satisfies JwtPayload);
    const refreshToken = await this.jwtService.signAsync(
      {
        ...basePayload,
        tokenType: 'refresh',
      } satisfies JwtPayload,
      {
        secret: refreshSecret,
        expiresIn: this.getRefreshExpiresIn(),
      },
    );

    await this.authRepository.updateRefreshTokenHash(
      user.id,
      await bcrypt.hash(refreshToken, 10),
    );

    return {
      accessToken,
      refreshToken,
      user: this.toAuthenticatedUser(user),
    };
  }

  private async verifyRefreshToken(refreshToken: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        { secret: this.getRequiredEnv('JWT_REFRESH_SECRET') },
      );

      if (payload.tokenType !== 'refresh') {
        throw new UnauthorizedException('Tipo de token invalido');
      }

      return payload;
    } catch {
      throw new UnauthorizedException('Refresh token invalido o expirado');
    }
  }

  private toAuthenticatedUser(user: AuthenticatedUser): AuthenticatedUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
      permissions: user.permissions,
    };
  }

  private getRequiredEnv(name: string): string {
    const value = process.env[name];
    if (!value || value.length < 32) {
      throw new Error(`${name} must contain at least 32 characters`);
    }
    return value;
  }

  private getRefreshExpiresIn() {
    return (process.env.JWT_REFRESH_EXPIRES_IN ?? '7d') as never;
  }
}
