import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { User } from './auth/decoraotors/user.decorator';
import { Upload } from './dto/Upload';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Get('/my')
  myFiles(@User('id') id: string) {
    return this.appService.MyFiles(id);
  }
}
