import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from '../dto/create-user-role.dto';
import { USER_ROLE_REPOSITORY } from '../domain/repositories/user-role.repository';
import type { UserRoleRepository } from '../domain/repositories/user-role.repository';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject(USER_ROLE_REPOSITORY)
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  assign(data: CreateUserRoleDto) {
    return this.userRoleRepository.assign(data);
  }

  findAll() {
    return this.userRoleRepository.findAll();
  }

  findByUser(userId: number) {
    return this.userRoleRepository.findByUser(userId);
  }

  remove(id: number) {
    return this.userRoleRepository.remove(id);
  }
}
