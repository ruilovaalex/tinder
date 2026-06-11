import { UserRole } from '@prisma/client';

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
  tokenType: 'access' | 'refresh';
}

export interface AuthenticatedUser {
  userId: number;
  email: string;
  role: UserRole;
  permissions: string[];
}
