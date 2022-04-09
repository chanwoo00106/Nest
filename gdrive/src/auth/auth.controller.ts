import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import { AuthService } from './auth.service';
import { Public } from './decoraotors/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Public()
  @Post('/login')
  async login(@Body() data: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(data);

    res.cookie('accessToken', tokens.accessToken);
    res.cookie('refreshToken', tokens.refreshToken);
    res.send();
  }
}
