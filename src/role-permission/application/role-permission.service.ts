import { Inject, Injectable } from '@nestjs/common';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { ROLE_PERMISSION_REPOSITORY } from '../domain/repositories/role-permission.repository';
import type { RolePermissionRepository } from '../domain/repositories/role-permission.repository';

@Injectable()
export class RolePermissionService {
  constructor(
    @Inject(ROLE_PERMISSION_REPOSITORY)
    private readonly rolePermissionRepository: RolePermissionRepository,
  ) {}

  assign(data: CreateRolePermissionDto) {
    return this.rolePermissionRepository.assign(data);
  }

  findAll() {
    return this.rolePermissionRepository.findAll();
  }

  findByRole(roleId: number) {
    return this.rolePermissionRepository.findByRole(roleId);
  }

  remove(id: number) {
    return this.rolePermissionRepository.remove(id);
  }
}
