import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { userDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({
    summary: '회원가입',
    description: '회원가입을 합니다',
  })
  @ApiResponse({
    status: 400,
    description: 'id가 존재할 때',
  })
  @Post('register')
  register(@Body() data: userDto) {
    return this.authService.register(data);
  }

  //---------------------------------------------

  @ApiOperation({
    summary: '로그인',
    description: '로그인을 합니다',
  })
  @ApiResponse({
    status: 400,
    description: 'user가 없을 때',
  })
  @Post('login')
  async login(
    @Body() user: userDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(user);
    const jwt = await this.jwtService.signAsync({ username: result });

    res.cookie('auth', jwt, { httpOnly: true });
    res.send();
  }

  async check(@Req() req: Request) {
    const cookie = req.cookies['auth'];
    if (await this.authService.check(cookie)) {
      return true;
    }
    return false;
  }
}
