import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    userId: string;
    email: string;
    age: number;
    favoriteFoods: string[];
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, {}>;
