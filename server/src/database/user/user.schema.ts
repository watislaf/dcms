import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, type: Number })
    _id: number;
    @Prop({ required: true, unique: true, lowercase: true })
    email: string;
    @Prop({ required: true })
    passwordHash: string;
    @Prop({ default: Date.now() })
    createdDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
