import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ROLE_REPOSITORY } from '../domain/repositories/role.repository';
import type { RoleRepository } from '../domain/repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  create(data: CreateRoleDto) {
    return this.roleRepository.create(data);
  }

  findAll() {
    return this.roleRepository.findAll();
  }

  findOne(id: number) {
    return this.roleRepository.findOne(id);
  }

  update(id: number, data: UpdateRoleDto) {
    return this.roleRepository.update(id, data);
  }

  remove(id: number) {
    return this.roleRepository.remove(id);
  }
}
