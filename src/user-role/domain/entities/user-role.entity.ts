import { RoleEntity } from '../../../role/domain/entities/role.entity';

export interface UserRoleEntity {
  id: number;
  userId: number;
  roleId: number;
}

export interface UserRoleWithRoleEntity extends UserRoleEntity {
  role: RoleEntity;
}

export interface UserRoleWithUserAndRoleEntity extends UserRoleWithRoleEntity {
  user: {
    id: number;
    name: string;
    email: string;
    age: number;
  };
}
