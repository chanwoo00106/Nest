import { IsString } from 'class-validator';

export class BlogDTO {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly user: string;
}
