import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @ApiOperation({ summary: 'todo 추가' })
  @Post('add')
  async createTodo(@Body() data: TodoDto): Promise<string> {
    this.appService.createTodo(data);
    return 'done';
  }
}
