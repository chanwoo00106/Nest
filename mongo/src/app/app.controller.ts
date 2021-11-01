import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

export interface Idata {
  title: string;
  description: string;
  data: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postData(@Body() userData: Idata) {
    return this.appService.postData(userData);
  }

  @Get('/:id')
  DetailPage(@Param('id') id: number) {
    return this.appService.DetailPage(id);
  }
}
