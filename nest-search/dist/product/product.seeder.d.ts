import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { ProductDocument } from './product.entity';
export declare class ProductSeeder implements Seeder {
    private readonly productModel;
    constructor(productModel: Model<ProductDocument>);
    seed(): Promise<any>;
    drop(): Promise<any>;
}
