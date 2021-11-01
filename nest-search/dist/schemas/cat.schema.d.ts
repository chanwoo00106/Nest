import { Document } from 'mongoose';
export declare type CatDocument = Cat & Document;
export declare class Cat {
    name: string;
    age: number;
    breed: string;
}
export declare const CatSchema: import("mongoose").Schema<Document<Cat, any, any>, import("mongoose").Model<Document<Cat, any, any>, any, any, any>, {}>;
