import { PermissionEntity } from '../../../permission/domain/entities/permission.entity';
import { RoleEntity } from '../../../role/domain/entities/role.entity';

export interface RolePermissionEntity {
  id: number;
  roleId: number;
  permissionId: number;
}

export interface RolePermissionWithPermissionEntity
  extends RolePermissionEntity {
  permission: PermissionEntity;
}

export interface RolePermissionWithRoleAndPermissionEntity
  extends RolePermissionWithPermissionEntity {
  role: RoleEntity;
}
