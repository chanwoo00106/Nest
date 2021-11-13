import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @MinLength(5)
  @IsString()
  username: string;

  @MinLength(5)
  @IsString()
  password: string;
}
