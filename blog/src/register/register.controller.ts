import { Body, Controller, Post } from '@nestjs/common';
import * as dto from './dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private Rs: RegisterService) {}

  @Post()
  async Register(@Body() data: dto.RegisterDto) {
    await this.Rs.Register(data);
    return '';
  }
}
