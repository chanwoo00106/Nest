import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { title: 'Hello μΉλ νμ°!' };
  }
}
