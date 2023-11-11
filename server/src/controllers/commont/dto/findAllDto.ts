import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@/controllers/commont/dto/paginationDto';
import { SorterDto } from '@/controllers/commont/dto/sortersDto';

export class FindAllDto {
    @ApiProperty({ required: true, type: PaginationDto })
    pagination: PaginationDto;
    @ApiProperty({ required: true, type: SorterDto, isArray: true })
    sorters: Array<SorterDto>;
}
