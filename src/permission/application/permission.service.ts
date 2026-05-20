import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PERMISSION_REPOSITORY } from '../domain/repositories/permission.repository';
import type { PermissionRepository } from '../domain/repositories/permission.repository';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  create(data: CreatePermissionDto) {
    return this.permissionRepository.create(data);
  }

  findAll() {
    return this.permissionRepository.findAll();
  }

  findOne(id: number) {
    return this.permissionRepository.findOne(id);
  }

  update(id: number, data: UpdatePermissionDto) {
    return this.permissionRepository.update(id, data);
  }

  remove(id: number) {
    return this.permissionRepository.remove(id);
  }
}
