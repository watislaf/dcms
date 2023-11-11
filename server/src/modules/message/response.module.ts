import { Module } from '@nestjs/common';
import { ResponseService } from '@/modules/message/response.service';

@Module({
    providers: [ResponseService],
    exports: [ResponseService],
})
export class ResponseModule {}
