import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}
  async register(data: RegisterDto) {
    if (data.wifiPw !== this.configService.get<string>('WIFI_PASSWORD'))
      throw new ForbiddenException('Not matched wifi password');
  }
}
