import { IsString } from 'class-validator';

export class Upload {
  @IsString()
  name: string;
}
