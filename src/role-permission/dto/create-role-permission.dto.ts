import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class CreateRolePermissionDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  roleId!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  permissionId!: number;
}
