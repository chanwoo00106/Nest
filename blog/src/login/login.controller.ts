import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import * as dto from './dto';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly LService: LoginService) {}
  @Post()
  async Login(@Body() data: dto.LoginDto, @Res() res: Response) {
    const result = await this.LService.Login(data);
    if (!result) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }
    res.cookie('id', result).send();
  }
}
