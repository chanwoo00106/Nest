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

  Register(data: dto.RegisterDto): Promise<Register> {
    const result = new this.RModel(data);
    return result.save();
  }
}
