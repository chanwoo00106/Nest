import { Injectable } from '@nestjs/common';
import * as dto from './dto';

@Injectable()
export class RegisterService {
  Register(data: dto.RegisterDto) {
    console.log(data);
    return 'Done';
  }
}
