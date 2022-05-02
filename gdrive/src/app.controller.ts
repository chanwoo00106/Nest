import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Public } from './auth/decoraotors/public.decorator';
import { User } from './auth/decoraotors/user.decorator';
import { Upload } from './dto/Upload';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/upload')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: Upload,
    @User() user: { id: string },
  ) {
    if (!file) throw new BadRequestException('Not Found file');

    return this.appService.s3_upload(
      file.buffer,
      file.originalname,
      file.mimetype,
      data,
      user.id,
    );
  }

  @Public()
  @Get('/file/:name')
  findFile(@Param('name') name: string) {
    return this.appService.findFile(name);
  }

  @Get('/my')
  myFiles(@User() { id }: { id: string }) {
    return this.appService.MyFiles(id);
  }

  @Delete('/file/:name')
  deleteFile(@Param('name') name: string, @User('id') id: string) {
    return this.appService.deleteFile(name, id);
  }

  @Public()
  @Get('/files')
  async files(@Query('page') page: string) {
    return this.appService.allFiles(page);
  }
}
