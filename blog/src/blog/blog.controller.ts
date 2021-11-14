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
import * as dto from './dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly BService: BlogService) {}

  @Get()
  getAll(): Promise<Iblog[]> {
    return this.BService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: dto.Id): Promise<Iblog> {
    return this.BService.getOne(id);
  }

  @Post()
  create(@Body() data: dto.Data): Promise<Iblog> {
    return this.BService.create(data);
  }

  @Put('/:id')
  update(@Param('id') id: dto.Id, @Body() data: dto.Data) {
    return this.BService.update(id, data);
  }

  @Delete('/:id')
  remove(@Param('id') id: dto.Id) {
    return this.BService.remove(id);
  }
}
