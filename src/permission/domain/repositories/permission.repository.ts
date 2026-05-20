import { CreatePermissionDto } from '../../dto/create-permission.dto';
import { UpdatePermissionDto } from '../../dto/update-permission.dto';
import { PermissionEntity } from '../entities/permission.entity';

export const PERMISSION_REPOSITORY = 'PERMISSION_REPOSITORY';

export interface PermissionRepository {
  create(data: CreatePermissionDto): Promise<PermissionEntity>;
  findAll(): Promise<PermissionEntity[]>;
  findOne(id: number): Promise<PermissionEntity>;
  update(id: number, data: UpdatePermissionDto): Promise<PermissionEntity>;
  remove(id: number): Promise<PermissionEntity>;
}
