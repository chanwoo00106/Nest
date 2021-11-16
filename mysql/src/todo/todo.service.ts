import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/Entity/todo.entity';
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
}
