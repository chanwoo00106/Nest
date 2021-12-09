import { BadRequestException, Injectable } from '@nestjs/common';
import { TodoDto, ToggleDto } from './dto/todo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/Entity/todo.entity';

@Injectable()
export class TodoService {
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
      let a;
      if (await this.todoRepository.find()) {
        a = await this.todoRepository.create({
          id: 1,
          ...todo,
          toggle: false,
        });
      } else {
        a = await this.todoRepository.create({
          ...todo,
          toggle: false,
        });
      }
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
