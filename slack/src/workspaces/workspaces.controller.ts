import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('workspaces')
export class WorkspacesController {
  @Get()
  getMyWorkspaces() {}

  @Post()
  createMyWorkspaces() {}

  @Get(':url/members')
  getAllMembersFromWorkspace() {}

  @Get(':url/members')
  inviteMembersToWorkspace() {}

  @Delete(':url/members')
  kickMembersFromWorkspace() {}

  @Get(':url/members')
  getMembersIntoInWorkspace() {}
}
