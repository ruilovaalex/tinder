import { CreateUserRoleDto } from '../../dto/create-user-role.dto';
import {
  UserRoleEntity,
  UserRoleWithRoleEntity,
  UserRoleWithUserAndRoleEntity,
} from '../entities/user-role.entity';

export const USER_ROLE_REPOSITORY = 'USER_ROLE_REPOSITORY';

export interface UserRoleRepository {
  assign(data: CreateUserRoleDto): Promise<UserRoleEntity>;
  findAll(): Promise<UserRoleWithUserAndRoleEntity[]>;
  findByUser(userId: number): Promise<UserRoleWithRoleEntity[]>;
  remove(id: number): Promise<UserRoleEntity>;
}
