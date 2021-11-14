import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService, Iblog } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly BService: BlogService) {}

  @Get()
  getAll(): Promise<Iblog[]> {
    return this.BService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<Iblog> {
    return this.BService.getOne(id);
  }

  @Post()
  create(@Body() data): Promise<Iblog> {
    return this.BService.create(data);
  }

  @Put('/:id')
  update(@Param('id') id, @Body() data) {
    return this.BService.update(id, data);
  }

  @Delete('/:id')
  remove(@Param('id') id) {
    return this.BService.remove(id);
  }
}
