import { InteractionType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsPositive } from 'class-validator';

export class CreateInteractionDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  toUserId!: number;

  @IsEnum(InteractionType)
  type!: InteractionType;
}
