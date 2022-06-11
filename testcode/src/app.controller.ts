import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Test } from './dto/test';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Query('num') num: string): Promise<number> {
    return this.appService.getHello(num);
  }

  @Post()
  async test(@Body() data: Test) {
    return data.num.num;
  }
}
