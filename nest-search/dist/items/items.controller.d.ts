import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    findAll(): Item[];
    findOne(param: any): Item;
    create(createItemDto: CreateItemDto): string;
    delete(id: any): string;
    update(updateItemDto: CreateItemDto, id: any): string;
}
