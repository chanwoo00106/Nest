import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { TodoDto } from './dto/todo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAll() {
    return this.appService.getAll();
  }

  @ApiOperation({ summary: 'todo 추가', description: 'todo를 추가합니다.' })
  @Post('add')
  async createTodo(@Body() data: TodoDto): Promise<string> {
    this.appService.createTodo(data);
    return 'done';
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() data: TodoDto,
  ): Promise<string> {
    this.appService.update(id, data);
    return 'done';
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    return this.appService.remove(id);
  }
}
