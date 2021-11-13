import { Injectable } from '@nestjs/common';
import * as dto from './dto';
import { LoginDocument, Login } from 'src/schema/login.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RegisterService {
  constructor(@InjectModel(Login.name) private RModel: Model<LoginDocument>) {}

  async Register(data: dto.RegisterDto): Promise<Login> {
    if (!(await this.RModel.findOne({ username: data.username }))) {
      const result = new this.RModel(data);
      return result.save();
    }
    return null;
  }
}
