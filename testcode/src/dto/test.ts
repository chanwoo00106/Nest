import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

class Num {
  @IsNumber()
  num: number;
}

export class Test {
  @Type(() => Num)
  @ValidateNested()
  num: Num;
}
