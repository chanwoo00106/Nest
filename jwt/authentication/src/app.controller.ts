import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hash = await bcrypt.hash(password, 10);

    return this.appService.create({
      name,
      email,
      password: hash,
    });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.appService.findOne({ email });

    if (!user) throw new BadRequestException('not found user');

    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException('not found user');

    return user;
  }
}
