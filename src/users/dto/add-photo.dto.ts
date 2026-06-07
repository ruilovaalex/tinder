import { IsUrl } from 'class-validator';

export class AddPhotoDto {
  @IsUrl({ require_tld: false })
  url!: string;
}
