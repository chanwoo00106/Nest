import { IsBoolean, IsString } from 'class-validator';

export class ToggleDto {
  @IsBoolean()
  toggle: boolean;
}

export class TodoDto extends ToggleDto {
  @IsString()
  todo: string;
}
