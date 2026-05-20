import { AuthRoleEntity, AuthUserEntity } from '../entities/auth-user.entity';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface CreateAuthUserData {
  name: string;
  email: string;
  age: number;
  passwordHash: string;
  roleId: number;
}

export interface DefaultRbacRoles {
  adminRole: AuthRoleEntity;
  userRole: AuthRoleEntity;
}

export interface AuthRepository {
  findByEmail(email: string): Promise<AuthUserEntity | null>;
  createUser(data: CreateAuthUserData): Promise<AuthUserEntity>;
  createProfile(userId: number): Promise<void>;
  createDefaultSubscription(userId: number): Promise<void>;
  countUsersByRole(roleId: number): Promise<number>;
  ensureDefaultRbacData(defaultPermissions: string[]): Promise<DefaultRbacRoles>;
  isUniqueConstraintError(error: unknown): boolean;
}
