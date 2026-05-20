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
    const role = await this.ensureRoleForNewUser();

    try {
      const user = await this.authRepository.createUser({
        name: data.name,
        email: data.email,
        age: data.age,
        passwordHash,
        roleId: role.id,
      });

      await this.authRepository.createProfile(user.id);
      await this.authRepository.createDefaultSubscription(user.id);

      return this.signUser(user);
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

    return this.signUser(user);
  }

  private async ensureRoleForNewUser() {
    const { adminRole, userRole } =
      await this.authRepository.ensureDefaultRbacData(this.defaultPermissions);
    const adminUsersCount = await this.authRepository.countUsersByRole(
      adminRole.id,
    );

    if (adminUsersCount === 0) {
      return adminRole;
    }

    return userRole;
  }

  private signUser(user: AuthenticatedUser): AuthResponse {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
      permissions: user.permissions,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
