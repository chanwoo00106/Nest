import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    this.appService.s3_upload(file.buffer, file.originalname, file.mimetype);
    return;
  }

  @Get('/file/:name')
  findFile(@Param('name') name: string) {
    return this.appService.findFile(name);
  }
}
