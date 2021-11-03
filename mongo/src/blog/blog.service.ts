import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDTO } from './dto/blog.dto';
import { Iblog } from './interfaces/blog.interface';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly data: Model<Iblog>) {}

  async getAll(): Promise<Iblog[]> {
    return await this.data.find();
  }

  async create(createData: BlogDTO): Promise<Iblog> {
    const result = new this.data(createData);
    return await result.save();
  }

  async update(id: string, data: Iblog): Promise<Iblog> {
    return await this.data.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string): Promise<Iblog> {
    return await this.data.findByIdAndRemove(id);
  }
}
