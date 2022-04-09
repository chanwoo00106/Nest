import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { Public } from './decoraotors/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
