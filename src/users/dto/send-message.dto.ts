import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class SendMessageDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  chatRoomId!: number;

  @IsString()
  @IsNotEmpty()
  content!: string;
}
