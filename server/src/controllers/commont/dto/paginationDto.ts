import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
    @ApiProperty({ required: true, type: Number })
    current: number;
    @ApiProperty({ required: true, type: Number })
    pageSize: number;
}
