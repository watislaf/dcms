import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NumberRange } from '@/database/common/range.schema';

export type SettingsDocument = Settings & Document;

@Schema()
export class Settings {
    @Prop({ type: NumberRange, required: true })
    userIdRange: NumberRange;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
