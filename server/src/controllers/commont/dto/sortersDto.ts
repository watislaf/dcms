import { ApiProperty } from '@nestjs/swagger';

export enum SorterOrder {
    Asc = 'asc',
    Desc = 'desc',
}

export class SorterDto {
    @ApiProperty({ required: true, type: String })
    field: string;
    @ApiProperty({ required: true, enum: ['asc', 'desc'] })
    order: SorterOrder;
}
