import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import * as dto from './dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private Rs: RegisterService) {}

  @Post()
  async Register(@Body() data: dto.RegisterDto, @Res() res: Response) {
    console.log('hello');
    const result = await this.Rs.Register(data);
    console.log(result);

    if (!result) {
      res.status(HttpStatus.UNAUTHORIZED).send();
    }
    res.status(HttpStatus.CREATED).send();
  }
}
