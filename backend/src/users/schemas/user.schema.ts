import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document, SchemaTypes } from 'mongoose';
import { Resume } from './resume.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String })
  middle_name: string;

  @Prop({ type: String, required: true })
  last_name: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Resume' })
  resumes: Resume[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
