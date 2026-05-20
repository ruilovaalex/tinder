import { CreateRoleDto } from '../../dto/create-role.dto';
import { UpdateRoleDto } from '../../dto/update-role.dto';
import { RoleEntity, RoleWithPermissionsEntity } from '../entities/role.entity';

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';

export interface RoleRepository {
  create(data: CreateRoleDto): Promise<RoleEntity>;
  findAll(): Promise<RoleWithPermissionsEntity[]>;
  findOne(id: number): Promise<RoleWithPermissionsEntity>;
  update(id: number, data: UpdateRoleDto): Promise<RoleEntity>;
  remove(id: number): Promise<RoleEntity>;
}
