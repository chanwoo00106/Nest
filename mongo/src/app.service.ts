import { Injectable } from '@nestjs/common';
import { Idata } from './app.controller';

export type Tdata = {
  id: number;
  title: string;
  description: string;
  data: string;
};

const data: Tdata[] = [];
let id = 0;

@Injectable()
export class AppService {
  getHello(): string {
    if (data !== null) return Object.assign(data);
    return 'null';
  }

  postData(userData: Idata) {
    data.push({
      id: ++id,
      ...userData,
    });
  }
}
