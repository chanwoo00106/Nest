import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('workspaces/:url/dms')
export class DmsController {
  @Get(':id/chats')
  getChat(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
    console.log(param.url, param.id);
  }

  @Post(':id/chats')
  PostChat(@Body() body) {}
}
