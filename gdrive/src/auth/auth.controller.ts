import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import { AuthService } from './auth.service';
import { Public } from './decoraotors/public.decorator';
import { Request, Response } from 'express';

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
    // res.setHeader(
    //   'Set-Cookie',
    //   `accessToken=${tokens.accessToken}; HttpOnly; refreshToken=${tokens.refreshToken}; HttpOnly;`,
    // );
    res.send();
  }

  @Public()
  @Get('/check')
  async check(@Req() req: Request) {
    console.log(req);
    return 'success';
  }
}
