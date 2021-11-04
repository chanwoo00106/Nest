import { IsString } from 'class-validator';

export class BlogDTO {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly user: string;
}

export class updateDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly user: string;
}

export class GetIdDto {
  @IsString()
  readonly id: string;
}
