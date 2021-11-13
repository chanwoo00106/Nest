import { Injectable } from '@nestjs/common';
import * as dto from './dto';
import { RegisterDocument, Register } from 'src/schema/register.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(Register.name) private RModel: Model<RegisterDocument>,
  ) {}

  async Register(data: dto.RegisterDto): Promise<Register> {
    if (!(await this.RModel.findOne({ username: data.username }))) {
      const result = new this.RModel(data);
      return result.save();
    }
    return null;
  }
}
