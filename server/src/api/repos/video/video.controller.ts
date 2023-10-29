import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { VideoService } from '@repos/video/video.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VideoDto } from '@/api/dto';

@ApiTags('Video')
@Controller('/api/v1/video')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}

    @Post()
    @ApiResponse({ type: VideoDto })
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'video', maxCount: 1 },
            { name: 'cover', maxCount: 1 },
        ])
    )
    async createBook(
        @Res() response,
        @Req() request,
        @Body() video: VideoDto,
        @UploadedFiles()
        files: {
            video?: Express.Multer.File[];
            cover?: Express.Multer.File[];
        }
    ) {
        const requestBody = {
            createdBy: request.user,
            title: video.title,
            video: files.video[0].filename,
            coverImage: files.cover[0].filename,
        };
        const newVideo = await this.videoService.createVideo(requestBody);
        return response.status(HttpStatus.CREATED).json({
            newVideo,
        });
    }

    @Get()
    @ApiResponse({ type: VideoDto })
    async read(@Query() id): Promise<object> {
        return await this.videoService.readVideo(id);
    }

    @Get('/:id')
    @ApiParam({
        name: 'id',
        required: true,
        type: String,
    })
    @ApiResponse({ type: VideoDto })
    async stream(@Param('id') id, @Res() response, @Req() request) {
        return this.videoService.streamVideo(id, response, request);
    }

    @Put('/:id')
    @ApiParam({
        name: 'id',
        required: true,
        type: String,
    })
    @ApiResponse({ type: VideoDto })
    async update(@Res() response, @Param('id') id, @Body() video: VideoDto) {
        const updatedVideo = await this.videoService.update(id, video);
        return response.status(HttpStatus.OK).json(updatedVideo);
    }

    @Delete('/:id')
    @ApiParam({
        name: 'id',
        required: true,
        type: String,
    })
    @ApiResponse({})
    async delete(@Res() response, @Param('id') id) {
        await this.videoService.delete(id);
        return response.status(HttpStatus.OK).json();
    }
}
