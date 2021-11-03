import { Controller, Get } from '@nestjs/common';

@Controller('blog')
export class BlogController {
  @Get()
  getAll(): string {
    return 'fuck';
  }
}
