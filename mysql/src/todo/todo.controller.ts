import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly Stodo: TodoService) {}
  @Get()
  getAllTodos() {
    return this.Stodo.getAllTodos();
  }

  @Post()
  create() {
    return this.Stodo.create();
  }

  @Put()
  update() {
    return this.Stodo.update();
  }

  @Delete()
  remove() {
    return this.Stodo.remove();
  }
}
