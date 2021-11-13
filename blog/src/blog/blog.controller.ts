import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly BService: BlogService) {}

  @Get()
  getAll() {
    return '';
  }

  @Get()
  getOne() {
    return '';
  }

  @Post()
  create() {
    return '';
  }

  @Put()
  Retouch() {
    return '';
  }

  @Delete()
  remove() {
    return 'Done';
  }
}
