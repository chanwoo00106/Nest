import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { userDto } from './dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
