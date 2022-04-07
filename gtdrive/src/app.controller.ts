import { Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index.ejs')
  getHello(): string {
    return;
  }

  @Post('/upload')
  upload() {
    return this.appService.upload();
  }
}
