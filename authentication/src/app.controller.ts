import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hash = await bcrypt.hash(password, 10);

    const user = await this.appService.create({
      name,
      email,
      password: hash,
    });

    delete user.password;

    return user;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.appService.findOne({ email });

    if (!user) throw new BadRequestException('not found user');

    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException('not found user');

    const jwt = await this.jwtService.signAsync({ id: user.id });

    res.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
    };
  }

  @Get('user')
  async user(@Req() req: Request) {
    try {
      const cookie = req.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.appService.findOne({ id: data.id });
      const { password, ...result } = user;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
}
