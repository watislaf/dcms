import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class NumberRange {
    @Prop({ required: true, type: Number })
    from: number;
    @Prop({ required: true, type: Number })
    to: number;
}
