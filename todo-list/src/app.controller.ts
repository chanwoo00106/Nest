import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { TodoDto, ToggleDto } from './dto/todo.dto';

@ApiTags('Todo')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: '모든 todo 불러오기',
    description: '모든 todo를 가져옵니다',
  })
  @ApiResponse({
    status: 400,
    description: '그냥 오류 나면 다 이거 뜸',
  })
  @Get()
  async getAll() {
    return this.appService.getAll();
  }

  //------------------------------------------------

  @ApiOperation({
    summary: 'todo 추가',
    description: 'todo를 추가합니다.',
  })
  @ApiResponse({
    status: 400,
    description: '그냥 오류 나면 다 이거 뜸',
  })
  @Post('add')
  async createTodo(@Body() data: TodoDto): Promise<string> {
    this.appService.createTodo(data);
    return 'done';
  }

  //------------------------------------------------

  @ApiOperation({
    summary: 'todo 업데이트',
    description: 'todo의 내용을 변경합니다.',
  })
  @ApiParam({
    name: 'id',
    description: 'todo id',
    example: 1,
    required: true,
  })
  @ApiResponse({
    status: 400,
    description: '그냥 오류 나면 다 이거 뜸',
  })
  @Put('update/:id')
  async update(@Param('id') id: number, @Body() data: TodoDto) {
    return this.appService.update(id, data);
  }

  //------------------------------------------------

  @ApiOperation({
    summary: 'todo 삭제',
    description: 'todo를 삭제합니다',
  })
  @ApiParam({
    name: 'id',
    description: '삭제할 todo의 id',
    required: true,
    example: 1,
  })
  @ApiResponse({
    status: 400,
    description: '그냥 오류 나면 다 이거 뜸',
  })
  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    return this.appService.remove(id);
  }

  //------------------------------------------------

  @ApiOperation({
    summary: '했는지 안 했는지 체크',
    description: 'toggle을 변경합니다',
  })
  @ApiParam({
    name: 'id',
    description: '변경할 todo의 id',
    required: true,
    example: 1,
  })
  @ApiResponse({
    status: 400,
    description: '그냥 오류 나면 다 이거 뜸',
  })
  @Patch('toggle/:id')
  async toggle(@Param('id') id: number, @Body() toggle: ToggleDto) {
    return this.appService.toggle(id, toggle);
  }
}
