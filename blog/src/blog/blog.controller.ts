import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
  async getOne(@Param('id') id: dto.Id, @Res() res: Response) {
    const result = await this.BService.getOne(id);

    if (!result) res.status(404).send('404 NotFound');

    res.status(200).json(result).send();
  }

  @Post()
  create(@Body() data: dto.Data): Promise<Iblog> {
    return this.BService.create(data);
  }

  @Put('/:id')
  async update(
    @Param('id') id: dto.Id,
    @Body() data: dto.Data,
    @Res() res: Response,
  ) {
    const result = await this.BService.update(
      id,
      { title: data.title, description: data.description, data: data.data },
      data.user,
    );

    if (!result) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }
    res.status(HttpStatus.OK).send();
  }

  @Delete('/:id')
  async remove(@Param('id') id: dto.Id) {
    await this.BService.remove(id);
    return;
  }
}
