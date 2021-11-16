import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly Stodo: TodoService) {}
  @Get()
  getAllTodos() {
    return this.Stodo.getOne();
  }
}
