import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { AuthService } from './auth.service';
import { AtGuard, RtGuard } from './common/guards';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() data: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(data);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() data: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(data);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken,
    @GetCurrentUserId() userId,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
