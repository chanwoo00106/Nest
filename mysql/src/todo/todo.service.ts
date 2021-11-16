import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private prepo: Repository<TodoEntity>,
  ) {}

  async getAllTodos() {
    return await this.prepo.find();
  }

  async getOne() {
    return await this.prepo.findOne({ id: 1 });
  }

  async create() {
    const newTodo = {
      id: 2,
      description: '어쩌고',
      title: '으야랸어랜어랜얼',
      status: TodoStatus.OPEN,
    };
    this.prepo.create(newTodo);
    return this.prepo.save(newTodo);
  }

  async update() {
    return this.prepo.update({ id: 1 }, { description: 'none' });
  }

  async remove() {
    return this.prepo.delete({ id: 2 });
  }
}
