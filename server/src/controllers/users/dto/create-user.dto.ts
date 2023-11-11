import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ required: true, type: String })
    password: string;
    @ApiProperty({ required: true, type: String })
    email: string;
}
