import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class ToggleDto {
  @IsBoolean()
  toggle: boolean;
}

export class TodoDto {
  @ApiProperty({ title: '할일', example: '티모 매드무비 찍기' })
  @IsString()
  todo: string;

  @ApiProperty({
    title: '날짜',
    description: '날짜와 시간 사이에 "T"를 넣어 표기',
    example: '2021-12-05T11:22:00',
  })
  @IsDateString()
  end_date: Date;
}
