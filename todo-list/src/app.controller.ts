import { Body, Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { TodoDto } from './dto/todo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'todo 추가' })
  @Get('add')
  async createTodo(@Body() data: TodoDto): Promise<string> {
    this.appService.createTodo(data);
    return 'done';
  }
}
