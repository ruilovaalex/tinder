import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class GiveLikeDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  likedId!: number;
}
