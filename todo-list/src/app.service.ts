import { BadRequestException, Injectable } from '@nestjs/common';
import { Todo } from './Entity/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async getAll() {
    return await this.todoRepository.find();
  }

  async createTodo(todo: TodoDto): Promise<void> {
    try {
      const a = await this.todoRepository.create({
        ...todo,
        toggle: false,
      });

      this.todoRepository.save(a);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
