import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  data: string;

  @Prop()
  user: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
