import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'exsample@exsample.com',
    description: '이메일',
    required: true,
  })
  public email: string;

  @ApiProperty({ example: 'nick', description: '닉네임', required: true })
  public nickname: string;

  @ApiProperty({ example: 'password', description: '비밀번호', required: true })
  public password: string;
}
