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

  async createTodo(data: TodoDto): Promise<void> {
    try {
      this.todoRepository.create(data);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
