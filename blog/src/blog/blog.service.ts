import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from 'src/schema/blog.schema';
import * as dto from './dto';

export interface Iblog {
  title: string;
  description: string;
  data: string;
  user: string;
}

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private BModel: Model<BlogDocument>) {}
  async getAll(): Promise<Iblog[]> {
    return await this.BModel.find();
  }

  async getOne(id: dto.Id): Promise<Iblog> {
    try {
      return await this.BModel.findById(id);
    } catch (e) {
      return null;
    }
  }

  async create(data: dto.Data): Promise<Blog> {
    const result = new this.BModel(data);
    return result.save();
  }

  async update(id: dto.Id, data: dto.UpdateData, user: string): Promise<Iblog> {
    const result = await this.BModel.findOneAndUpdate(
      { _id: id, user: user },
      data,
    );

    if (!result) return null;
    return result;
  }

  async remove(id: dto.Id): Promise<Iblog> {
    return await this.BModel.findByIdAndRemove(id);
  }
}
