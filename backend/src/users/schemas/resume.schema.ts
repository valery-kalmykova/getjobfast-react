import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document } from 'mongoose';

export type ResumeDocument = Resume & Document;

@Schema({ timestamps: true })
export class Resume {
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  pdfhh: string;
  @Prop({ type: String, required: true })
  idhh: string;
  @Prop({ type: String, required: true })
  status: string;
  @Prop({ type: String, required: true })
  access: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
