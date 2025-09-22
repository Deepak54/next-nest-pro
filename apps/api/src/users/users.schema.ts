import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

// Este tipo exportado é a chave. Ele combina nossa classe User com o Document do Mongoose.
export type UserDocument = User & Document & { _id: ObjectId };

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: [String], default: ['user'] })
  roles: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: String, required: false })
  refreshTokenHash?: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);