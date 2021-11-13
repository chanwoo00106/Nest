import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegisterDocument = Register & Document;

@Schema()
export class Register {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
