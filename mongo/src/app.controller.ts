import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  mainPage(): string {
    return 'hello';
  }
}
