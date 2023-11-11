import { Module } from '@nestjs/common';
import { MaterialsService } from '@/controllers/materials/materials.service';
import { MaterialsController } from '@/controllers/materials/materials.controller';

@Module({
    controllers: [MaterialsController],
    providers: [MaterialsService],
})
export class MaterialsModule {}
