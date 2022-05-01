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
      expires: new Date(tokens.AtExpiredAt),
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(tokens.RtExpiredAt),
    });
    res.send();
  }

  @Post('/refresh')
  @Public()
  @UseGuards(new RtGuard())
  async refresh(@User() data: { id: string }, @Res() res: Response) {
    const tokens = await this.authService.refresh(data);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      expires: new Date(tokens.AtExpiredAt),
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(tokens.RtExpiredAt),
    });
    res.send({ ...tokens });
  }

  @Get('/check')
  async check() {
    return 'success';
  }

  @Post('/logout')
  async logout(@Res() res: Response, @User('id') id: string) {
    await this.authService.logout(id);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.send();
  }
}
