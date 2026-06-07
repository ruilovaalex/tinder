import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class CreateUserRoleDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  userId!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  roleId!: number;
}
