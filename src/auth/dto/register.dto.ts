import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(120)
  age!: number;

  @IsString()
  @MinLength(8)
  password!: string;
}
