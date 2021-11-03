import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: '645783563478',
      name: 'Item One',
      qty: 100,
      description: 'this is item one',
    },
    {
      id: '347860281545',
      name: 'Item Two',
      qty: 100,
      description: 'this is item two',
    },
  ];

  findeAll(): Item[] {
    return this.items;
  }

  findOne(id: string): Item {
    return this.items.find((i) => i.id === id);
  }
}
