import { BadRequestException, Injectable } from '@nestjs/common';
import { Todo } from './Entity/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoDto, ToggleDto } from './dto/todo.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async getAll(): Promise<Todo[]> {
    try {
      return await this.todoRepository.find();
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async createTodo(todo: TodoDto): Promise<Todo> {
    try {
      const a = await this.todoRepository.create({
        ...todo,
        toggle: false,
      });

      return this.todoRepository.save(a);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async update(id: number, data: TodoDto) {
    const todo = await this.todoRepository.findOne(id);
    if (todo) {
      return await this.todoRepository.update(id, { ...data });
    }
    throw new BadRequestException();
  }

  async remove(id: number) {
    const todo = await this.todoRepository.findOne(id);
    if (todo) {
      return await this.todoRepository.delete(id);
    }
    throw new BadRequestException();
  }

  async toggle(id: number, data: ToggleDto) {
    const todo = await this.todoRepository.findOne(id);
    if (todo) {
      return await this.todoRepository.update(id, { toggle: data.toggle });
    }
    throw new BadRequestException();
  }
}
