import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoginDocument = Login & Document;

@Schema()
export class Login {
  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
