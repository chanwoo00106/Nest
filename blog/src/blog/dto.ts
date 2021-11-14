import { IsString } from 'class-validator';

export class Id {
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

export class UpdateData {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  data: string;
}
