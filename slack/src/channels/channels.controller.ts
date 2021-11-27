import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('workspaces/:url/channels')
export class ChannelsController {
  @Get()
  getChannels() {}

  @Post()
  createChannel() {}

  @Get(':name')
  getSpecificChannel() {}

  @Get(':id/chats')
  getChat(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
    console.log(param.url, param.id);
  }

  @Post(':id/chats')
  PostChat(@Body() body) {}

  @Get(':name/members')
  getAllMembers() {}

  @Get(':name/members')
  inviteMembers() {}
}
