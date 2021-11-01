import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    frontend(): Promise<import("./product.entity").Product & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
