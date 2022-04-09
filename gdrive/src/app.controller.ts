import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Upload } from './dto/Upload';

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
  upload(@UploadedFile() file: Express.Multer.File, @Body() data: Upload) {
    if (!file) throw new BadRequestException('Not Found file');
    this.appService.s3_upload(
      file.buffer,
      file.originalname,
      file.mimetype,
      data,
    );
    return;
  }

  @Get('/file/:name')
  findFile(@Param('name') name: string) {
    return this.appService.findFile(name);
  }
}
