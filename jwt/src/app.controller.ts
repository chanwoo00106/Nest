import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const Hash = await bcrypt.hash(password, 12);

    return this.appService.create({ name, email, password: Hash });
  }
}
