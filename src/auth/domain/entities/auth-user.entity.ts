export interface AuthUserEntity {
  id: number;
  email: string;
  name: string;
  password: string | null;
  isActive: boolean;
  roles: string[];
  permissions: string[];
}

export interface AuthRoleEntity {
  id: number;
  name: string;
  description: string | null;
}
