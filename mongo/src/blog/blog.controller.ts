import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDTO, GetIdDto, updateDto } from './dto/blog.dto';
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

  @Put()
  async update(@Body() data: updateDto): Promise<Iblog> {
    return this.blogService.update(data);
  }

  @Delete()
  async remove(@Body('id') id: GetIdDto): Promise<Iblog> {
    return this.blogService.remove(id.id);
  }
}
