import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Data {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  data: string;
}

export const DataSchema = SchemaFactory.createForClass(Data);
