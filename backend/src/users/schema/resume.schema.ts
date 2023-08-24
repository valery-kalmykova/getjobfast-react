import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>

@Schema()
class Resume {
  @Prop()
  email: string;

  @Prop()
  first_name: string;

  @Prop()
  middle_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone: string;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);