import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>

@Schema()
class User {
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

export const UserSchema = SchemaFactory.createForClass(User);