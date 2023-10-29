import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenDTO {
    @ApiProperty({ required: true, type: String })
    token: string;
}
