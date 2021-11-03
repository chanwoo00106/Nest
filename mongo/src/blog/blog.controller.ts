import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDTO } from './dto/blog.dto';
import { Iblog } from './interfaces/blog.interface';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Get()
  async getAll(): Promise<Iblog[]> {
    return this.blogService.getAll();
  }

  @Post()
  async create(@Body() data: BlogDTO): Promise<Iblog> {
    return this.blogService.create(data);
  }

  @Put(':id')
  async update(@Body() data: BlogDTO, @Param('id') id): Promise<Iblog> {
    return this.blogService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id): Promise<Iblog> {
    return this.blogService.remove(id);
  }
}
