import { ApiProperty } from '@nestjs/swagger';
import { AuthLoginDto } from '@dto/user/authLoginDto';

export class VideoDto {
    @ApiProperty({ required: true, type: String })
    title: string;
    @ApiProperty({ required: true, type: String })
    video: string;
    @ApiProperty({ required: true, type: String })
    coverImage: string;
    @ApiProperty({ required: true, type: Date })
    uploadDate: Date;
    @ApiProperty({ required: true, type: () => AuthLoginDto })
    createdBy: AuthLoginDto;
}
