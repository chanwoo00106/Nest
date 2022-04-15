import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import { AuthService } from './auth.service';
import { Public } from './decoraotors/public.decorator';
import { Response } from 'express';
import { User } from './decoraotors/user.decorator';
import { RtGuard } from './guards/rt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Public()
  @Post('/signin')
  async login(@Body() data: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(data);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      expires: new Date(new Date().setSeconds(new Date().getSeconds() + 900)),
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(
        new Date().setSeconds(new Date().getSeconds() + 604800),
      ),
    });
    res.send();
  }

  @Post('/refresh')
  @Public()
  @UseGuards(new RtGuard())
  async refresh(@User() data: { id: string }) {
    return this.authService.refresh(data);
  }

  @Get('/check')
  async check() {
    return 'success';
  }
}
