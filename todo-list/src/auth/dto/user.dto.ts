import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min } from 'class-validator';

export class userDto {
  @ApiProperty({ title: '사용자 이름', example: 'Teemo' })
  @IsString()
  username: string;

  @ApiProperty({ title: '비밀번호', example: 'password' })
  @IsString()
  @Min(8)
  password: string;
}
