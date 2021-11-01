import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
export declare class UserRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findOne(userFilterQuery: FilterQuery<User>): Promise<User>;
    find(usersFilterQuery: FilterQuery<User>): Promise<User[]>;
    create(user: User): Promise<User>;
}
