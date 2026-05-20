import { CreateRolePermissionDto } from '../../dto/create-role-permission.dto';
import {
  RolePermissionEntity,
  RolePermissionWithPermissionEntity,
  RolePermissionWithRoleAndPermissionEntity,
} from '../entities/role-permission.entity';

export const ROLE_PERMISSION_REPOSITORY = 'ROLE_PERMISSION_REPOSITORY';

export interface RolePermissionRepository {
  assign(data: CreateRolePermissionDto): Promise<RolePermissionEntity>;
  findAll(): Promise<RolePermissionWithRoleAndPermissionEntity[]>;
  findByRole(roleId: number): Promise<RolePermissionWithPermissionEntity[]>;
  remove(id: number): Promise<RolePermissionEntity>;
}
