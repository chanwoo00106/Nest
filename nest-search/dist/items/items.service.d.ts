import { Item } from './interfaces/item.interface';
export declare class ItemsService {
    private readonly items;
    findeAll(): Item[];
    findOne(id: string): Item;
}
