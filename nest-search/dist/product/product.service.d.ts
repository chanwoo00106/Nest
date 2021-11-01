import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.entity';
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<ProductDocument>);
    find(options: any): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
