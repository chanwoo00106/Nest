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
    console.log(id);
    return this.BService.getOne(id);
  }

  @Post()
  create(@Body() data: dto.Data): Promise<Iblog> {
    return this.BService.create(data);
  }

  @Put('/:id')
  async update(@Param('id') id: dto.Id, @Body() data: dto.UpdateData) {
    await this.BService.update(id, data);
    return;
  }

  @Delete('/:id')
  async remove(@Param('id') id: dto.Id) {
    await this.BService.remove(id);
    return;
  }
}
