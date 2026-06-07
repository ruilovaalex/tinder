import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddMusicDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  artist!: string;

  @IsOptional()
  @IsString()
  genre?: string;
}
