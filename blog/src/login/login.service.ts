import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login, LoginDocument } from 'src/schema/login.schema';
import * as dto from './dto';

@Injectable()
export class LoginService {
  constructor(@InjectModel(Login.name) private LModel: Model<LoginDocument>) {}

  async Login(data: dto.LoginDto) {
    const result = await this.LModel.findOne({ ...data });
    if (!result) return null;
    return result._id;
  }
}
