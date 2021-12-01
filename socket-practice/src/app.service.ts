import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { title: 'Hello 씹덕 형우!' };
  }
}
