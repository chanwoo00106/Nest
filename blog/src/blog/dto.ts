import { IsString } from 'class-validator';

export class Id {
  @IsString()
  id: string;
}

export class Data {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  data: string;

  @IsString()
  user: string;
}
